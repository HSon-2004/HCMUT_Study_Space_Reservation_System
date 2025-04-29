from mongoengine import connect
from .settings import Config

def init_db():
    connect(
        db="booking_system",
        host=Config.MONGO_URI
    )
    print("Database connected!")