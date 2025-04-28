# app/__init__.py

from flask import Flask
<<<<<<< HEAD
from flask_mongoengine import MongoEngine
from config import MONGODB_SETTINGS
from routes.room_route import room_bp
    



from .database import init_db
from .seed_data import seed_data

=======
from app.config.settings import Config
from app.database import init_db
from app.routes import api_bp
from app.seed_data import seed_data
>>>>>>> origin/be/TriSon

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_db()
    # seed_data()
    app.register_blueprint(api_bp)

    return app
