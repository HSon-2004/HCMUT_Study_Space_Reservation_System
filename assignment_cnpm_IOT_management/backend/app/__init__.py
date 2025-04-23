from flask import Flask
from app.database import init_db
from app.routes.iot_routes import iot_bp
from app.config.settings import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Khởi tạo cơ sở dữ liệu
    init_db()

    # Đăng ký blueprint
    app.register_blueprint(iot_bp)

    return app