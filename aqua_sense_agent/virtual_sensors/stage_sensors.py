from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query, HTTPException, Path
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from collections import OrderedDict
from datetime import datetime, timezone
import asyncio, time, random
from typing import List, Dict, Any, Optional


# ---------- simple in-memory config store (per-stage) ----------
_STAGE_CONFIG: Dict[str, Dict[str, float]] = {}
_CONFIG_LOCK = asyncio.Lock()

class StageConfigIn(BaseModel):
    abnormal_duration: Optional[float] = Field(None, ge=0.0, description="Seconds to hold abnormal values")
    abnormal_steps: Optional[int] = Field(None, ge=0, description="Samples to hold abnormal values")
    ab_alpha: Optional[float] = Field(None, ge=0.0, le=1.0, description="Decay factor during abnormal window")
    normal_duration: Optional[float] = Field(None, ge=0.0, description="Seconds to hold normal values between abnormal windows")
    normal_steps: Optional[int] = Field(None, ge=0, description="Samples to hold normal values between abnormal windows")

class StageConfigOut(BaseModel):
    abnormal_duration: Optional[float]
    abnormal_steps: Optional[int]
    ab_alpha: Optional[float]
    normal_duration: Optional[float]
    normal_steps: Optional[int]

# ---------- helper to get effective params (query param overrides stored config) ----------
async def effective_params(stage: str,
                           q_ab_duration: Optional[float],
                           q_ab_steps: Optional[int],
                           q_ab_alpha: Optional[float],
                           q_normal_duration: Optional[float],
                           q_normal_steps: Optional[int]):
    """Return (abnormal_duration, abnormal_steps, ab_alpha, normal_duration, normal_steps)
       Precedence:
         1) explicit query params (if not None)
         2) stored config for stage
         3) defaults
    """
    defaults = {
        "abnormal_duration": 0.0,
        "abnormal_steps": 5,
        "ab_alpha": 0.06,
        "normal_duration": 10.0,
        "normal_steps": 30
    }
    # if any query param present, prefer queries (and fall back to defaults for missing)
    if (q_ab_duration is not None or q_ab_steps is not None or q_ab_alpha is not None
            or q_normal_duration is not None or q_normal_steps is not None):
        return (
            q_ab_duration if q_ab_duration is not None else defaults["abnormal_duration"],
            q_ab_steps if q_ab_steps is not None else defaults["abnormal_steps"],
            q_ab_alpha if q_ab_alpha is not None else defaults["ab_alpha"],
            q_normal_duration if q_normal_duration is not None else defaults["normal_duration"],
            q_normal_steps if q_normal_steps is not None else defaults["normal_steps"],
        )

    # otherwise check stored config
    async with _CONFIG_LOCK:
        cfg = _STAGE_CONFIG.get(stage, {})
        return (
            float(cfg.get("abnormal_duration", defaults["abnormal_duration"])),
            int(cfg.get("abnormal_steps", defaults["abnormal_steps"])),
            float(cfg.get("ab_alpha", defaults["ab_alpha"])),
            float(cfg.get("normal_duration", defaults["normal_duration"])),
            int(cfg.get("normal_steps", defaults["normal_steps"]))
        )

# ---------- sensor definitions ----------
def bounded(x, a, b):
    return max(a, min(b, x))

PRIMARY_SENSORS = [
    {"id": "flow", "unit": "m3/h", "min": 0.1, "max": 200.0, "baseline": 30.0},
    {"id": "level", "unit": "%", "min": 0.0, "max": 100.0, "baseline": 50.0},
    {"id": "turbidity", "unit": "NTU", "min": 0.0, "max": 5000.0, "baseline": 500.0},
    {"id": "pressure", "unit": "kPa", "min": 0.0, "max": 200.0, "baseline": 30.0},
    {"id": "temperature", "unit": "°C", "min": -10.0, "max": 80.0, "baseline": 25.0},
]

SECONDARY_SENSORS = [
    {"id": "do", "unit": "mg/L", "min": 0.0, "max": 20.0, "baseline": 3.5},
    {"id": "ph", "unit": "", "min": 0.0, "max": 14.0, "baseline": 7.5},
    {"id": "orp", "unit": "mV", "min": -500.0, "max": 1000.0, "baseline": 120.0},
    {"id": "tss_mlss", "unit": "mg/L", "min": 0.0, "max": 2000.0, "baseline": 250.0},
    {"id": "ammonia", "unit": "mg/L", "min": 0.0, "max": 100.0, "baseline": 2.0},
    {"id": "sludge_level", "unit": "%", "min": 0.0, "max": 100.0, "baseline": 45.0},
    {"id": "secondary_flow", "unit": "m3/h", "min": 0.1, "max": 500.0, "baseline": 50.0},
]

TERTIARY_SENSORS = [
    {"id": "conductivity", "unit": "µS/cm", "min": 0.0, "max": 10000.0, "baseline": 800.0},
    {"id": "tds", "unit": "mg/L", "min": 0.0, "max": 5000.0, "baseline": 800.0},
    {"id": "nitrate", "unit": "mg/L", "min": 0.0, "max": 500.0, "baseline": 20.0},
    {"id": "residual_chlorine", "unit": "mg/L", "min": 0.0, "max": 10.0, "baseline": 0.6},
    {"id": "turbidity_final", "unit": "NTU", "min": 0.0, "max": 1000.0, "baseline": 2.0},
    {"id": "differential_pressure", "unit": "kPa", "min": 0.0, "max": 1000.0, "baseline": 120.0},
    {"id": "salinity", "unit": "ppt", "min": 0.0, "max": 35.0, "baseline": 0.2},
    {"id": "oil_in_water", "unit": "ppm", "min": 0.0, "max": 200.0, "baseline": 0.5},
    {"id": "uvt", "unit": "%", "min": 0.0, "max": 100.0, "baseline": 70.0},
]

# ---------- SensorNode with abnormal/normal cycling ----------
class SensorNode:
    def __init__(self, sensors, abnormal_templates, per_sensor_recovery, node_id="node",
                 interval=1.0,
                 abnormal_steps=10, abnormal_duration=0.0, ab_alpha=0.06,
                 normal_steps=20, normal_duration=10.0):
        self.sensors = sensors
        self.node_id = node_id
        self.interval = float(interval)

        # abnormal window control (either by duration or by steps)
        self.abnormal_steps_total = max(0, int(abnormal_steps))
        self.abnormal_sent = 0
        self.abnormal_duration = float(abnormal_duration)
        self.abnormal_start_time = None  # set when abnormal window begins

        # normal window control
        self.normal_steps_total = max(0, int(normal_steps))
        self.normal_sent = 0
        self.normal_duration = float(normal_duration)
        self.normal_start_time = None  # set when normal window begins

        self.ab_alpha = float(ab_alpha)
        self.ab_templates = abnormal_templates or {}
        self.per_sensor_recovery = per_sensor_recovery or {}

        # state = current reading values
        self.state = {s["id"]: float(s["baseline"]) for s in sensors}

        # cycle starts with abnormal window active by default (useful for demo)
        self.cycle_abnormal = True
        self._begin_abnormal()

    def _begin_abnormal(self):
        # set abnormal start and counters and initialize abnormal values
        self.abnormal_sent = 0
        self.abnormal_start_time = time.time() if self.abnormal_duration > 0 else None
        # Set initial abnormal state (templates or multiplier)
        for s in self.sensors:
            sid = s["id"]
            if sid in self.ab_templates:
                v = float(self.ab_templates[sid])
            else:
                v = float(s["baseline"]) * 1.5
            v = float(round(v + random.gauss(0, max(0.5, abs(v)*0.02)), 4))
            self.state[sid] = bounded(v, s["min"], s["max"])
        # reset normal counters
        self.normal_sent = 0
        self.normal_start_time = None

    def _begin_normal(self):
        self.normal_sent = 0
        self.normal_start_time = time.time() if self.normal_duration > 0 else None
        # during normal window we typically let sensor move toward baseline (recover)
        # do not forcibly reset to baseline; let _recover() steer it
        self.abnormal_sent = 0
        self.abnormal_start_time = None

    def _in_abnormal_window(self):
        if self.cycle_abnormal:
            if self.abnormal_duration and self.abnormal_start_time is not None:
                return (time.time() - self.abnormal_start_time) < self.abnormal_duration
            return self.abnormal_sent < self.abnormal_steps_total
        return False

    def _in_normal_window(self):
        if not self.cycle_abnormal:
            if self.normal_duration and self.normal_start_time is not None:
                return (time.time() - self.normal_start_time) < self.normal_duration
            return self.normal_sent < self.normal_steps_total
        return False

    def _recover_step(self):
        # move each sensor gradually toward its baseline (with small random noise)
        for s in self.sensors:
            sid = s["id"]
            baseline = float(s["baseline"])
            cur = float(self.state[sid])
            if sid in self.per_sensor_recovery:
                alpha = float(self.per_sensor_recovery[sid])
            else:
                # default heuristics
                if sid in ("turbidity", "turbidity_final", "differential_pressure"):
                    alpha = 0.10
                elif sid in ("flow", "secondary_flow", "conductivity", "tds"):
                    alpha = 0.30
                elif sid in ("do", "nitrate", "residual_chlorine"):
                    alpha = 0.20
                else:
                    alpha = 0.25
            noise = random.uniform(-0.5, 0.5)
            newv = cur + alpha * (baseline - cur) + noise
            self.state[sid] = bounded(newv, s["min"], s["max"])

    def step(self):
        # Determine current window; toggle windows when their duration/steps elapse.
        if self.cycle_abnormal:
            # currently abnormal window active
            if self._in_abnormal_window():
                # keep abnormal behaviour (decay toward baseline with ab_alpha but starting from abnormal)
                self.abnormal_sent += 1
                for s in self.sensors:
                    sid = s["id"]
                    baseline = float(s["baseline"])
                    cur = float(self.state[sid])
                    decay = self.ab_alpha * (baseline - cur)
                    jitter = random.gauss(0, max(0.4, abs(cur)*0.01))
                    extra_decay = 0.0
                    if "flow" in sid:
                        extra_decay = 0.02 * (baseline - cur)
                    newv = cur + decay + extra_decay + jitter
                    self.state[sid] = bounded(newv, s["min"], s["max"])
                # if abnormal window now finished, switch to normal
                if not self._in_abnormal_window():
                    self.cycle_abnormal = False
                    self._begin_normal()
            else:
                # abnormal window ended immediately (zero-length) -> switch to normal
                self.cycle_abnormal = False
                self._begin_normal()
        else:
            # normal window active
            if self._in_normal_window():
                # normal behaviour: recover toward baseline
                self.normal_sent += 1
                self._recover_step()
                if not self._in_normal_window():
                    # normal finished -> start abnormal
                    self.cycle_abnormal = True
                    self._begin_abnormal()
            else:
                # normal window ended immediately -> start abnormal
                self.cycle_abnormal = True
                self._begin_abnormal()

        # produce output payload
        out = OrderedDict()
        out["timestamp"] = datetime.now(timezone.utc).isoformat()
        out["node_id"] = self.node_id
        out["window"] = "abnormal" if self.cycle_abnormal else "normal"
        for s in self.sensors:
            out[s["id"]] = round(self.state[s["id"]], 4)
        return out

# ---------- templates and recovery settings (unchanged) ----------
PRIMARY_AB = {
    "turbidity": 1600.0, "pressure": 90.0, "temperature": 48.0, "level": 95.0, "flow": PRIMARY_SENSORS[0]["baseline"] * 2.0
}
SECONDARY_AB = {
    "do": 0.5, "ph": 5.5, "orp": -50.0, "tss_mlss": 800.0, "ammonia": 12.0, "sludge_level": 75.0, "secondary_flow": SECONDARY_SENSORS[-1]["baseline"] * 1.6
}
TERTIARY_AB = {
    "conductivity": 3000.0, "tds": 1800.0, "nitrate": 80.0, "residual_chlorine": 3.0,
    "turbidity_final": 12.0, "differential_pressure": 350.0, "salinity": 6.0, "oil_in_water": 20.0, "uvt": 40.0
}

PRIMARY_RECOVERY = {"turbidity": 0.08, "pressure": 0.08, "flow": 0.35}
SECONDARY_RECOVERY = {"tss_mlss": 0.08, "ammonia": 0.06, "do": 0.12}
TERTIARY_RECOVERY = {"tds": 0.12, "turbidity_final": 0.09, "differential_pressure": 0.06}

# ---------- node factories with normal options ----------
def make_primary_node(interval=1.0, abnormal_steps=10, abnormal_duration=0.0, ab_alpha=0.06,
                      normal_steps=20, normal_duration=10.0):
    return SensorNode(PRIMARY_SENSORS, PRIMARY_AB, PRIMARY_RECOVERY, node_id="primary-node",
                      interval=interval,
                      abnormal_steps=abnormal_steps, abnormal_duration=abnormal_duration, ab_alpha=ab_alpha,
                      normal_steps=normal_steps, normal_duration=normal_duration)

def make_secondary_node(interval=1.0, abnormal_steps=10, abnormal_duration=0.0, ab_alpha=0.06,
                        normal_steps=20, normal_duration=10.0):
    return SensorNode(SECONDARY_SENSORS, SECONDARY_AB, SECONDARY_RECOVERY, node_id="secondary-node",
                      interval=interval,
                      abnormal_steps=abnormal_steps, abnormal_duration=abnormal_duration, ab_alpha=ab_alpha,
                      normal_steps=normal_steps, normal_duration=normal_duration)

def make_tertiary_node(interval=1.0, abnormal_steps=10, abnormal_duration=0.0, ab_alpha=0.06,
                       normal_steps=20, normal_duration=10.0):
    return SensorNode(TERTIARY_SENSORS, TERTIARY_AB, TERTIARY_RECOVERY, node_id="tertiary-node",
                      interval=interval,
                      abnormal_steps=abnormal_steps, abnormal_duration=abnormal_duration, ab_alpha=ab_alpha,
                      normal_steps=normal_steps, normal_duration=normal_duration)

# ---------- SSE/ws helpers that read effective config ----------
def sse_stream_for(stage: str, node_factory):
    async def stream(interval: float = 1.0,
                     abnormal_steps: Optional[int] = Query(None, ge=0),
                     abnormal_duration: Optional[float] = Query(None, ge=0.0),
                     ab_alpha: Optional[float] = Query(None, ge=0.0, le=1.0),
                     normal_steps: Optional[int] = Query(None, ge=0),
                     normal_duration: Optional[float] = Query(None, ge=0.0)):
        eff_ab_duration, eff_ab_steps, eff_ab_alpha, eff_normal_duration, eff_normal_steps = await effective_params(
            stage, abnormal_duration, abnormal_steps, ab_alpha, normal_duration, normal_steps
        )
        node = node_factory(interval=interval,
                            abnormal_steps=eff_ab_steps, abnormal_duration=eff_ab_duration, ab_alpha=eff_ab_alpha,
                            normal_steps=eff_normal_steps, normal_duration=eff_normal_duration)
        async def event_gen():
            yield ":\n\n"
            while True:
                yield f"data: {node.step()}\n\n"
                await asyncio.sleep(node.interval)
        return StreamingResponse(event_gen(), media_type="text/event-stream")
    return stream

def ws_endpoint_for(stage: str, node_factory):
    async def ws_endpoint(ws: WebSocket, interval: float = 1.0,
                          abnormal_steps: Optional[int] = None, abnormal_duration: Optional[float] = None,
                          ab_alpha: Optional[float] = None,
                          normal_steps: Optional[int] = None, normal_duration: Optional[float] = None):
        eff_ab_duration, eff_ab_steps, eff_ab_alpha, eff_normal_duration, eff_normal_steps = await effective_params(
            stage, abnormal_duration, abnormal_steps, ab_alpha, normal_duration, normal_steps
        )
        await ws.accept()
        node = node_factory(interval=interval,
                            abnormal_steps=eff_ab_steps, abnormal_duration=eff_ab_duration, ab_alpha=eff_ab_alpha,
                            normal_steps=eff_normal_steps, normal_duration=eff_normal_duration)
        try:
            while True:
                await ws.send_json(node.step())
                await asyncio.sleep(node.interval)
        except WebSocketDisconnect:
            return
    return ws_endpoint

# ---------- streaming routes ----------
