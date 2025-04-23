# app/main.py
from fastapi import FastAPI
from app.config.database import init_db
from app.routes.room_routes import router as room_router

app = FastAPI(title="Booking App")

@app.on_event("startup")
def on_startup():
    init_db()

# mount router
app.include_router(room_router, prefix="/rooms", tags=["rooms"])
