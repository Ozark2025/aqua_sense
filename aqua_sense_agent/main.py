from fastapi import FastAPI
from fastapi import FastAPI
import joblib
import numpy as np
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query, HTTPException, Path
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from collections import OrderedDict
from datetime import datetime, timezone
import asyncio, time, random
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse, HTMLResponse
from collections import OrderedDict
from datetime import datetime, timezone
import asyncio
import random, math
import numpy as np

from virtual_sensors.stage_sensors import (
    make_primary_node,
    make_secondary_node,
    make_tertiary_node,
    sse_stream_for,
    ws_endpoint_for,
    StageConfigIn,
    StageConfigOut,
    _CONFIG_LOCK,
    _STAGE_CONFIG,
)




from virtual_sensors.initial_sensors import VirtualSensorNode


vnode = VirtualSensorNode(node_id="virtual-node-01", interval=1.0)

scaler          = joblib.load("scaler.joblib")
rf_model        = joblib.load("random_forest.joblib")
label_encoder   = joblib.load("label_encoder.joblib")
app = FastAPI()

@app.get("/")
def home():
    return {"message": "FastAPI working!"}



@app.get("/vsensor-initial")
def get_single_sensor_reading():
    return vnode.step()

def get_sensor_data():
    return {
        "pH": 7.1,
        "turbidity_NTU": 3.2,
        "temperature_C": 25.0,
        "DO_mg_L": 6.8,
        "conductivity_uS_cm": 410,
        "TDS_mg_L": 290
    }


scaler = joblib.load("scaler.joblib")
rf_model = joblib.load("random_forest.joblib")
lr_model = joblib.load("logistic_regression.joblib")
dt_model = joblib.load("decision_tree.joblib")
label_encoder = joblib.load("label_encoder.joblib")


@app.get("/get_pridiction_start")
def get_pridiction_start():

    data = vnode.step()

    X = np.array([[
        data["pH"],
        data["turbidity_NTU"],
        data["temperature_C"],
        data["DO_mg_L"],
        data["conductivity_uS_cm"],
        data["TDS_mg_L"]
    ]])

    X_scaled = scaler.transform(X)

    # Predictions
    pred_rf = rf_model.predict(X_scaled)[0]
    pred_lr = lr_model.predict(X_scaled)[0]
    pred_dt = dt_model.predict(X_scaled)[0]

    predictions = [pred_rf, pred_lr, pred_dt]

    final_pred = max(set(predictions), key=predictions.count)
    final_label = label_encoder.inverse_transform([final_pred])[0]

    # Model-wise probabilities
    probs_rf = rf_model.predict_proba(X_scaled)[0]
    probs_lr = lr_model.predict_proba(X_scaled)[0]
    probs_dt = dt_model.predict_proba(X_scaled)[0]

    num_classes = len(probs_rf)
    categories = label_encoder.inverse_transform(list(range(num_classes)))

    # Build combined confidence
    category_confidence = []

    for i, cat in enumerate(categories):
        avg_prob = (probs_rf[i] + probs_lr[i] + probs_dt[i]) / 3
        category_confidence.append({
            "label": cat,
            "confidence": float(avg_prob)
        })

    # SORT descending by confidence
    category_confidence_sorted = sorted(
        category_confidence,
        key=lambda x: x["confidence"],
        reverse=True
    )

    return {
        "sensor_data": data,

        "model_predictions": {
            "random_forest": label_encoder.inverse_transform([pred_rf])[0],
            "logistic_regression": label_encoder.inverse_transform([pred_lr])[0],
            "decision_tree": label_encoder.inverse_transform([pred_dt])[0],
        },

        "category_confidence": category_confidence_sorted,

        "final_majority_label": final_label
    }



app.get("/primary_sensors/stream")(sse_stream_for("primary", make_primary_node))
app.get("/secondary_sensors/stream")(sse_stream_for("secondary", make_secondary_node))
app.get("/tertiary_sensors/stream")(sse_stream_for("tertiary", make_tertiary_node))

app.websocket("/ws/primary")(ws_endpoint_for("primary", make_primary_node))
app.websocket("/ws/secondary")(ws_endpoint_for("secondary", make_secondary_node))
app.websocket("/ws/tertiary")(ws_endpoint_for("tertiary", make_tertiary_node))

VALID_STAGES = {"primary", "secondary", "tertiary"}

@app.post("/config/{stage}", response_model=StageConfigOut)
async def set_stage_config(stage: str = Path(..., description="Stage to configure"), payload: StageConfigIn = None):
    stage = stage.lower()
    if stage not in VALID_STAGES:
        raise HTTPException(status_code=400, detail=f"Invalid stage: {stage}")
    if payload is None:
        raise HTTPException(status_code=400, detail="Empty payload")
    async with _CONFIG_LOCK:
        cur = _STAGE_CONFIG.get(stage, {})
        if payload.abnormal_duration is not None:
            cur["abnormal_duration"] = float(payload.abnormal_duration)
        if payload.abnormal_steps is not None:
            cur["abnormal_steps"] = int(payload.abnormal_steps)
        if payload.ab_alpha is not None:
            cur["ab_alpha"] = float(payload.ab_alpha)
        if payload.normal_duration is not None:
            cur["normal_duration"] = float(payload.normal_duration)
        if payload.normal_steps is not None:
            cur["normal_steps"] = int(payload.normal_steps)
        _STAGE_CONFIG[stage] = cur
        return StageConfigOut(
            abnormal_duration=cur.get("abnormal_duration"),
            abnormal_steps=cur.get("abnormal_steps"),
            ab_alpha=cur.get("ab_alpha"),
            normal_duration=cur.get("normal_duration"),
            normal_steps=cur.get("normal_steps"),
        )

@app.get("/config/{stage}", response_model=StageConfigOut)
async def get_stage_config(stage: str = Path(..., description="Stage to read config for")):
    stage = stage.lower()
    if stage not in VALID_STAGES:
        raise HTTPException(status_code=400, detail=f"Invalid stage: {stage}")
    async with _CONFIG_LOCK:
        cur = _STAGE_CONFIG.get(stage, {})
        return StageConfigOut(
            abnormal_duration=cur.get("abnormal_duration"),
            abnormal_steps=cur.get("abnormal_steps"),
            ab_alpha=cur.get("ab_alpha"),
            normal_duration=cur.get("normal_duration"),
            normal_steps=cur.get("normal_steps"),
        )

@app.delete("/config/{stage}")
async def delete_stage_config(stage: str = Path(..., description="Stage to clear config")):
    stage = stage.lower()
    if stage not in VALID_STAGES:
        raise HTTPException(status_code=400, detail=f"Invalid stage: {stage}")
    async with _CONFIG_LOCK:
        _STAGE_CONFIG.pop(stage, None)
    return {"detail": "cleared"}



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
