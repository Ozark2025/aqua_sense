from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/")
def home():
    return {"message": "FastAPI working!"}


import requests

url = "http://127.0.0.1:8000/primary_sensors/stream"
with requests.get(url, stream=True) as r:
    for line in r.iter_lines():
        if line.startswith(b"data:"):
            payload = line.replace(b"data:", b"").strip()
            print(payload)
