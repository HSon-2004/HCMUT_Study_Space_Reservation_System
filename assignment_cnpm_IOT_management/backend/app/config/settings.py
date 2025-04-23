import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DEBUG = os.getenv('DEBUG', 'False') == 'True'
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/mydatabase')
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key_here')