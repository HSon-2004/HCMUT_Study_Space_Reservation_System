from flask import Blueprint
from .booking_routes import booking_bp
# from .user_routes import user_bp

api_bp = Blueprint('api', __name__)
api_bp.register_blueprint(booking_bp)
# api_bp.register_blueprint(user_bp)
