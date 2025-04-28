from flask import Flask
from flask_mongoengine import MongoEngine
from config import MONGODB_SETTINGS
from routes.room_route import room_bp
from .database import init_db
from .seed_data import seed_data
from .config.settings import Config
from .routes import api_bp
from routes.iot_routes import iot_bp
from config.settings import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_db()
    seed_data()

    # Đăng ký blueprint
    app.register_blueprint(api_bp)
    app.register_blueprint(iot_bp)

    return app