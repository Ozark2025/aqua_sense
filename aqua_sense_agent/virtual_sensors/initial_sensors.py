# sensor_stream_api_filtered.py
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse, HTMLResponse
from collections import OrderedDict
from datetime import datetime, timezone
import asyncio
import random, math
import numpy as np

app = FastAPI(title="Virtual Sensor Stream API - Filtered Outputs")

# ---------- sensor catalog ----------
SENSORS = [
    {"id":"flow_primary","name":"Flow Sensor (primary)","unit":"m3/h","min":0.1,"max":50,"dynamics":"moderate"},
    {"id":"level_primary","name":"Level Sensor","unit":"cm","min":0,"max":500,"dynamics":"slow"},
    {"id":"turbidity_primary","name":"Turbidity","unit":"NTU","min":0,"max":1000,"dynamics":"fast"},
    {"id":"pressure_screens","name":"Pressure Sensor (screens)","unit":"kPa","min":0,"max":200,"dynamics":"moderate"},
    {"id":"temp","name":"Temperature","unit":"°C","min":5,"max":40,"dynamics":"slow"},
    {"id":"do","name":"Dissolved Oxygen","unit":"mg/L","min":0,"max":20,"dynamics":"fast"},
    {"id":"ph","name":"pH","unit":"pH","min":4,"max":10,"dynamics":"moderate"},
    {"id":"orp","name":"ORP","unit":"mV","min":-300,"max":800,"dynamics":"moderate"},
    {"id":"tss","name":"TSS / Turbidity (secondary)","unit":"mg/L","min":0,"max":500,"dynamics":"fast"},
    {"id":"ammonia","name":"Ammonia (NH3)","unit":"mg/L","min":0,"max":100,"dynamics":"slow"},
    {"id":"flow_secondary","name":"Flow Sensor (secondary)","unit":"m3/h","min":0.05,"max":40,"dynamics":"moderate"},
    {"id":"sludge_level","name":"Sludge Level","unit":"cm","min":0,"max":300,"dynamics":"slow"},
    {"id":"conductivity","name":"Conductivity (EC)","unit":"µS/cm","min":50,"max":8000,"dynamics":"slow"},
    {"id":"residual_chlorine","name":"Residual Chlorine","unit":"mg/L","min":0,"max":5,"dynamics":"fast"},
    {"id":"nitrate","name":"Nitrate (NO3)","unit":"mg/L","min":0,"max":200,"dynamics":"slow"},
    {"id":"turbidity_final","name":"Fine Turbidity","unit":"NTU","min":0,"max":50,"dynamics":"fast"},
    {"id":"dp_membrane","name":"DP Membrane (diff. pressure)","unit":"kPa","min":0,"max":500,"dynamics":"moderate"},
    {"id":"salinity","name":"Salinity","unit":"ppt","min":0,"max":50,"dynamics":"slow"},
    {"id":"oil_in_water","name":"Oil-in-Water","unit":"ppm","min":0,"max":100,"dynamics":"sparse"},
    {"id":"uvt","name":"UV Transmittance (UVT)","unit":"%","min":0,"max":100,"dynamics":"slow"},
    {"id":"pH_reuse","name":"pH (reuse)","unit":"pH","min":4,"max":10,"dynamics":"moderate"},
    {"id":"tds","name":"TDS (derived)","unit":"mg/L","min":10,"max":10000,"dynamics":"slow"},
    {"id":"turbidity_reuse","name":"Turbidity (reuse)","unit":"NTU","min":0,"max":100,"dynamics":"fast"},
    {"id":"residual_chlorine_reuse","name":"Residual Chlorine (reuse)","unit":"mg/L","min":0,"max":5,"dynamics":"fast"},
    {"id":"ammonia_reuse","name":"Ammonia (reuse)","unit":"mg/L","min":0,"max":100,"dynamics":"slow"},
    {"id":"nitrate_reuse","name":"Nitrate (reuse)","unit":"mg/L","min":0,"max":200,"dynamics":"slow"},
    {"id":"temperature_reuse","name":"Temperature (reuse)","unit":"°C","min":5,"max":40,"dynamics":"slow"},
    {"id":"cod","name":"COD (estimated)","unit":"mg/L","min":0,"max":1000,"dynamics":"slow"},
    {"id":"bod","name":"BOD (estimated)","unit":"mg/L","min":0,"max":500,"dynamics":"slow"},
]
TDS_FACTOR = 0.7

# ---------- utilities ----------
def bounded(x, a, b):
    return max(a, min(b, x))

def stage_baseline(sensor_id):
    base = {
        "flow_primary": 10, "level_primary": 200, "turbidity_primary": 200,
        "pressure_screens": 30, "temp": 25, "do": 6, "ph": 7, "orp": 200,
        "tss": 150, "ammonia": 20, "flow_secondary": 8, "sludge_level": 100,
        "conductivity": 800, "residual_chlorine": 0.2, "nitrate": 10,
        "turbidity_final": 2, "dp_membrane": 40, "salinity": 0.5, "oil_in_water": 0,
        "uvt": 80, "pH_reuse": 7, "tds": 560, "turbidity_reuse": 2,
        "residual_chlorine_reuse": 0.2, "ammonia_reuse": 1, "nitrate_reuse": 2,
        "temperature_reuse": 25, "cod": 150, "bod": 60,
    }
    return base.get(sensor_id, 0)

def dynamic_noise(dynamics):
    return {"slow":0.01,"moderate":0.03,"fast":0.08,"sparse":0.02}.get(dynamics, 0.03)

def maybe_fault(value, t, fault_prob=0.0005):
    r = random.random()
    if r < fault_prob:
        return value * (1 + random.uniform(2,6))
    if 0.0005 < r < 0.001:
        return value + random.uniform(-0.2*abs(value), 0.2*abs(value))
    if 0.001 < r < 0.0015:
        return None
    return value

class VirtualSensorNode:
    def __init__(self, node_id="virtual-node-01", interval=1.0):
        self.node_id = node_id
        self.interval = interval
        self.state = {}
        self.time = 0.0

    def step(self):
        ts = datetime.now(timezone.utc).isoformat()
        out = OrderedDict()
        out["timestamp"] = ts
        out["node_id"] = self.node_id
        upset = random.random() < 0.02
        for s in SENSORS:
            sid = s["id"]
            baseline = stage_baseline(sid)
            period_factor = 1.0
            if s["dynamics"] in ("fast","moderate"):
                period_factor += 0.05 * math.sin(self.time/30.0 + (hash(sid)%10))
            if upset:
                if "turbidity" in sid or sid in ("tss","turbidity_primary","turbidity_final","turbidity_reuse"):
                    baseline *= random.uniform(1.5,4.0)
                if sid in ("ammonia","nitrate"):
                    baseline *= random.uniform(1.2,3.0)
                if sid=="do":
                    baseline *= random.uniform(0.2,0.8)
            noise_scale = dynamic_noise(s["dynamics"])
            prev = self.state.get(sid, baseline)
            step_val = np.random.normal(loc=(baseline - prev)*0.01, scale=abs(prev)*noise_scale + 1e-6)
            value = prev + step_val
            value = value * period_factor
            value = bounded(value, s["min"], s["max"])
            value = maybe_fault(value, self.time)
            if value is None:
                out[sid] = None
            else:
                out[sid] = float(round(value, 4))
                self.state[sid] = float(round(value, 6))

        # derived fields
        ec = out.get("conductivity")
        out["tds"] = float(round(bounded(ec * TDS_FACTOR, 0, 100000),4)) if ec is not None else None
        if out.get("ph") is not None:
            out["pH_reuse"] = float(round(bounded(out["ph"] + random.uniform(-0.05,0.05), 4, 10),4))
        if out.get("turbidity_final") is not None:
            out["turbidity_reuse"] = float(round(bounded(out["turbidity_final"] + random.uniform(-0.2,0.2), 0, 100),4))
        if out.get("residual_chlorine") is not None:
            out["residual_chlorine_reuse"] = float(round(bounded(out["residual_chlorine"] + random.uniform(-0.05,0.05), 0, 5),4))
        if out.get("ammonia") is not None:
            out["ammonia_reuse"] = float(round(bounded(out["ammonia"] * random.uniform(0.05,0.2), 0, 100),4))
        if out.get("nitrate") is not None:
            out["nitrate_reuse"] = float(round(bounded(out["nitrate"] * random.uniform(0.05,0.2),0,200),4))
        if out.get("temp") is not None:
            out["temperature_reuse"] = float(round(out["temp"] + random.uniform(-0.2,0.2),4))

        try:
            tss_val = out.get("tss") or out.get("turbidity_primary") or 0
            turb_final = out.get("turbidity_final") or out.get("turbidity_primary") or 0
            ec_val = out.get("conductivity") or 0
            cod_est = 0.8 * tss_val + 1.2 * turb_final + 0.02 * ec_val + random.gauss(0,10)
            bod_est = max(0.2 * cod_est + random.gauss(0,5), 0)
            out["cod"] = float(round(bounded(cod_est, 0, 2000),4))
            out["bod"] = float(round(bounded(bod_est, 0, 1000),4))
        except Exception:
            out["cod"] = None
            out["bod"] = None

        self.time += self.interval

        # --- reduce to only requested output fields with requested rename ---
        selected = OrderedDict()
        # mapping: output_key -> internal sensor id
        mapping = {
            "pH": "ph",
            "turbidity_NTU": "turbidity_primary",
            "temperature_C": "temp",
            "DO_mg_L": "do",
            "conductivity_uS_cm": "conductivity",
            "TDS_mg_L": "tds",
        }
        # include timestamp and node_id for traceability
        selected["timestamp"] = out["timestamp"]
        selected["node_id"] = out["node_id"]
        for out_key, internal_id in mapping.items():
            val = out.get(internal_id)
            # make sure floats stay JSON serializable; keep None as-is
            selected[out_key] = (None if val is None else float(round(val, 4)))

        return selected

# ---------- Streaming endpoints (filtered outputs) ----------
@app.get("/initial_sensors/stream")
async def sse_stream(interval: float = 1.0, node_id: str = "virtual-node-01"):
    """
    SSE endpoint that streams ONLY the requested fields.
    Example: curl -N "http://127.0.0.1:8000/initial_sensors/stream?interval=0.5"
    """
    node = VirtualSensorNode(node_id=node_id, interval=interval)

    async def event_generator():
        yield ":\n\n"
        while True:
            sample = node.step()
            yield f"data: {sample}\n\n"
            await asyncio.sleep(node.interval)
    return StreamingResponse(event_generator(), media_type="text/event-stream")

@app.websocket("/ws")
async def websocket_stream(ws: WebSocket, interval: float = 1.0, node_id: str = "virtual-node-01"):
    """
    WebSocket endpoint that sends ONLY the requested fields as JSON.
    Example: wscat -c "ws://127.0.0.1:8000/ws?interval=1"
    """
    await ws.accept()
    node = VirtualSensorNode(node_id=node_id, interval=interval)
    try:
        while True:
            sample = node.step()
            await ws.send_json(sample)
            await asyncio.sleep(node.interval)
    except WebSocketDisconnect:
        return
