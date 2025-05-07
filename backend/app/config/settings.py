import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DEBUG = os.getenv('DEBUG', 'False') == 'True'
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/mydatabase')
    JWT_SECRET = os.getenv("JWT_SECRET", "fallback-secret-if-not-set")
    JWT_EXP_DELTA_SECONDS = int(os.getenv("JWT_EXP_DELTA_SECONDS", 3600))  # 1 hour