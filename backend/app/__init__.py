# app/__init__.py

from flask import Flask
from app.config.settings import Config
from app.database import init_db
from app.routes import api_bp
from app.seed_data import seed_data

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_db()
    # seed_data()
    app.register_blueprint(api_bp)

    return app
