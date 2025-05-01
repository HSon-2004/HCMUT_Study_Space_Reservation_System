from flask import Blueprint, request, jsonify
from app.services import user_service
from mongoengine.errors import DoesNotExist, ValidationError
from bson import ObjectId

user_bp = Blueprint('user', __name__)

# # GET /users - get all users (tạm thời cho mục đích test)
# @user_bp.route('', methods=['GET'])
# def get_users():
#     users = user_service.get_all_users()
#     return jsonify([u.to_mongo().to_dict() for u in users]), 200

# GET /users/<user_id>
@user_bp.route('/users/me', methods=['GET'])
def get_user_by_header():
    try:
        user_id = request.headers.get("User-ID")
        
        if not user_id:
            return jsonify({"error": "Missing User-ID header"}), 400
        user = user_service.get_user_by_id(user_id)

        if user is None:
            return jsonify({"error": "User not found"}), 404
        user_dict = user.to_mongo().to_dict()
        for key, value in user_dict.items():
            if isinstance(value, ObjectId):
                user_dict[key] = str(value)
        
        return jsonify(user_dict), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
