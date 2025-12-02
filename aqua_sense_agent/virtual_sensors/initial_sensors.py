# app.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any, AsyncGenerator
from datetime import datetime, timezone
import asyncio
import random
import numpy as np
import json

app = FastAPI(title="Virtual Sensor Node API")

# ---------------------------
# VirtualNode class (pure random values)
# ---------------------------
class VirtualSensorNode:
    """
    Virtual sensor node generating PURE random samples strictly within defined ranges.
    No drift, no baseline, no sinusoidal variations.
    """

    RANGES = {
        "pH": (6.5, 8.5),
        "turbidity_NTU": (1.0, 1500.0),
        "temperature_C": (15.0, 40.0),
        "DO_mg_L": (1.0, 12.0),
        "conductivity_uS_cm": (200.0, 6000.0),
        "TDS_mg_L": (80.0, 3500.0),
    }

    def __init__(self, node_id: str = "virtual-node-01", interval: float = 1.0, seed: Optional[int] = None):
        self.node_id = node_id
        self.interval = float(interval)

        if seed is not None:
            random.seed(seed)
            np.random.seed(seed)

    def step(self) -> Dict[str, Any]:
        """
        Generate ONE sample of purely random values inside allowed ranges.
        """
        sample = {
            "node_id": self.node_id,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "pH": round(random.uniform(*self.RANGES["pH"]), 3),
            "turbidity_NTU": round(random.uniform(*self.RANGES["turbidity_NTU"]), 3),
            "temperature_C": round(random.uniform(*self.RANGES["temperature_C"]), 3),
            "DO_mg_L": round(random.uniform(*self.RANGES["DO_mg_L"]), 3),
            "conductivity_uS_cm": round(random.uniform(*self.RANGES["conductivity_uS_cm"]), 3),
            "TDS_mg_L": round(random.uniform(*self.RANGES["TDS_mg_L"]), 3),
            "interval_s": self.interval,
        }
        return sample

    async def async_stream(self) -> AsyncGenerator[Dict[str, Any], None]:
        """
        Async generator that yields random samples at interval.
        """
        while True:
            yield self.step()
            await asyncio.sleep(self.interval)


# instantiate default node
vnode = VirtualSensorNode(node_id="virtual-node-01", interval=1.0)


# ---------------------------
# Pydantic response model
# ---------------------------
class SensorReading(BaseModel):
    node_id: str
    timestamp: str
    pH: float
    turbidity_NTU: float
    temperature_C: float
    DO_mg_L: float
    conductivity_uS_cm: float
    TDS_mg_L: float
    interval_s: float


# ---------------------------
# HTTP endpoints
# ---------------------------
@app.get("/virtual-sensor", response_model=SensorReading)
def get_single_reading():
    return vnode.step()


@app.get("/virtual-sensor/stream")
async def stream_sse():
    async def event_generator():
        async for sample in vnode.async_stream():
            yield f"data: {json.dumps(sample)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


# ---------------------------
# WebSocket endpoint
# ---------------------------
@app.websocket("/ws/virtual-sensor")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    send_task = None

    try:
        async def sender():
            async for sample in vnode.async_stream():
                await websocket.send_text(json.dumps(sample))

        send_task = asyncio.create_task(sender())

        while True:
            try:
                msg = await websocket.receive_text()
            except WebSocketDisconnect:
                break

            if msg:
                try:
                    data = json.loads(msg)
                    if data.get("action") == "stop":
                        await websocket.send_text(json.dumps({"status": "closing"}))
                        break
                except json.JSONDecodeError:
                    pass

    finally:
        if send_task:
            send_task.cancel()
        try:
            await websocket.close()
        except:
            pass







# CONTINUOUS FLOW

# # app.py
# from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
# from fastapi.responses import StreamingResponse, JSONResponse
# from pydantic import BaseModel
# from typing import Optional, Dict, Any, List, AsyncGenerator
# from datetime import datetime, timezone
# import asyncio
# import random
# import math
# import numpy as np
# import json

# # Optional ML imports - will be attempted, but app works without them
# try:
#     import joblib
#     _HAS_ML = True
# except Exception:
#     _HAS_ML = False

# app = FastAPI(title="Virtual Sensor Node API")

# # ---------------------------
# # VirtualNode class (updated ranges + async helpers)
# # ---------------------------
# class VirtualSensorNode:
#     """
#     Simple virtual sensor node that produces realistic-ish water quality samples.
#     Constructor signature matches your call: VirtualSensorNode(node_id="virtual-node-01", interval=1.0)
#     """

#     RANGES = {
#         "pH": (6.5, 8.5),
#         "turbidity_NTU": (1.0, 1500.0),
#         "temperature_C": (18.0, 40.0),
#         "DO_mg_L": (1.0, 12.0),
#         "conductivity_uS_cm": (200.0, 6000.0),
#         "TDS_mg_L": (80.0, 3500.0),
#     }

#     def __init__(self, node_id: str = "virtual-node-01", interval: float = 1.0, seed: Optional[int] = None):
#         self.node_id = node_id
#         self.interval = float(interval)
#         self._t = 0.0
#         if seed is not None:
#             random.seed(seed)
#             np.random.seed(seed)

#         def midpoint(r): return (r[0] + r[1]) / 2.0
#         self.baseline = {
#             k: midpoint(v) for k, v in self.RANGES.items()
#         }

#         # internal drift/noise parameters
#         self._drift = {k: 0.0 for k in self.baseline}
#         self._running = False  # used if you run a background producer

#     def _noise(self, scale: float):
#         return float(np.random.normal(scale=scale))

#     def _clip(self, key: str, value: float) -> float:
#         lo, hi = self.RANGES[key]
#         return float(max(lo, min(hi, value)))

#     def step(self) -> Dict[str, Any]:
#         """
#         Advance node state by one interval and return a sample dict.
#         All outputs are clipped to the configured realistic ranges.
#         """
#         self._t += self.interval

#         # simulate slow drift and occasional resets
#         for k in self._drift:
#             self._drift[k] += self._noise(scale=0.005 * (1 + abs(self._drift[k])))
#             if random.random() < 0.001:
#                 self._drift[k] *= 0.2

#         # base sinusoidal daily variation (small amplitude)
#         day_phase = math.sin(self._t / 3600.0 * 2 * math.pi / 24.0)

#         # produce raw values around baseline + drift + noise
#         pH_raw = self.baseline["pH"] + self._drift["pH"] + 0.15 * day_phase + self._noise(0.05)
#         turbidity_raw = self.baseline["turbidity_NTU"] + self._drift["turbidity_NTU"] * 20 + 10.0 * abs(day_phase) + self._noise(5.0)
#         temp_raw = self.baseline["temperature_C"] + 1.5 * day_phase + self._drift["temperature_C"] + self._noise(0.3)
#         do_raw = self.baseline["DO_mg_L"] - 0.5 * day_phase + self._drift["DO_mg_L"] + self._noise(0.3)
#         conductivity_raw = self.baseline["conductivity_uS_cm"] * (1 + 0.01 * day_phase) + self._drift["conductivity_uS_cm"] * 50 + self._noise(10.0)
#         tds_raw = self.baseline["TDS_mg_L"] * (1 + 0.005 * day_phase) + self._drift["TDS_mg_L"] * 25 + self._noise(5.0)

#         # occasional spikes/noisy events but keep within absolute ranges
#         if random.random() < 0.005:
#             spike_factor = random.uniform(2.0, 6.0)
#             turbidity_raw *= spike_factor
#         if random.random() < 0.003:
#             conductivity_raw *= (1 + random.uniform(0.1, 0.5))

#         # Clip all values to requested ranges
#         pH = round(self._clip("pH", pH_raw), 3)
#         turbidity = round(self._clip("turbidity_NTU", turbidity_raw), 3)
#         temp = round(self._clip("temperature_C", temp_raw), 3)
#         do = round(self._clip("DO_mg_L", do_raw), 3)
#         conductivity = round(self._clip("conductivity_uS_cm", conductivity_raw), 3)
#         tds = round(self._clip("TDS_mg_L", tds_raw), 3)

#         sample = {
#             "node_id": self.node_id,
#             "timestamp": datetime.now(timezone.utc).isoformat(),
#             "pH": pH,
#             "turbidity_NTU": turbidity,
#             "temperature_C": temp,
#             "DO_mg_L": do,
#             "conductivity_uS_cm": conductivity,
#             "TDS_mg_L": tds,
#             "interval_s": self.interval
#         }
#         return sample

#     async def async_stream(self) -> AsyncGenerator[Dict[str, Any], None]:
#         """
#         Async generator that yields samples at `self.interval` without blocking the event loop.
#         Usage: async for sample in vnode.async_stream(): ...
#         """
#         while True:
#             yield self.step()
#             await asyncio.sleep(self.interval)

#     def start_background(self):
#         """Optional: flip running flag used by external background tasks."""
#         self._running = True

#     def stop_background(self):
#         self._running = False

