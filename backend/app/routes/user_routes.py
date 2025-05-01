from flask import Blueprint, request, jsonify
from app.schemas.user_service import UserCreate, UserLogin
from app.services.user_service import UserService

user_bp = Blueprint('user', __name__)

@user_bp.route('/signup', methods=['POST'])
def signup():
    try:
        user_data = UserCreate(**request.json)
        return UserService.create_user(user_data)
    except Exception as e:
        return {"error": str(e)}, 400

@user_bp.route('/login', methods=['POST'])
def login():
    try:
        login_data = UserLogin(**request.json)
        return UserService.login_user(login_data.email, login_data.password)
    except Exception as e:
        return {"error": str(e)}, 400

@user_bp.route('/logout', methods=['POST'])
def logout():
    # In a real application, you would invalidate the JWT token here
    return {"message": "Logged out successfully"}, 200
