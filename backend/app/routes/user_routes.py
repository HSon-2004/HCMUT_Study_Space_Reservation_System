from flask import Blueprint, request, jsonify
from mongoengine.errors import DoesNotExist, ValidationError
from bson import ObjectId
from app.schemas import UserCreate, UserLogin
from app.services import UserService
from app.config import Config
from app.utils import token_required, serialize_user
import jwt


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
    return {"message": "Logged out successfully"}, 200

@user_bp.route('/users', methods=['GET'])
@token_required
def get_all_users():
    role = request.role
    if role != "admin":
        return {"error": "Unauthorized"}, 403
    
    try:
        users = UserService.get_all_users()
        return jsonify([serialize_user(user) for user in users]), 200
    except Exception as e:
        print(e)
        return {"error": str(e)}, 400

@user_bp.route('/users/create', methods=['POST'])
@token_required
def add_user():
    role = request.role
    if role != "admin":
        return {"error": "Unauthorized"}, 403
    
    try:
        user_data = UserCreate(**request.json)
        return UserService.create_user(user_data)
    except Exception as e:
        return {"error": str(e)}, 400


    
@user_bp.route('/users/<user_id>/update', methods=['PUT'])
@token_required
def update_user(user_id):
    role = request.role
    if role != "admin":
        return {"error": "Unauthorized"}, 403
    
    try:
        user = UserService.update_user(user_id, request.json)
        if not user:
            return {"error": "User not found"}, 404
        return {"message": "User updated successfully"}, 200
    except Exception as e:
        return {"error": str(e)}, 400

@user_bp.route('/users/<user_id>', methods=['DELETE'])
@token_required
def delete_user(user_id):
    role = request.role
    if role != "admin":
        return {"error": "Unauthorized"}, 403
    
    try:
        user = UserService.get_user_by_id(user_id)
        if not user:
            return {"error": "User not found"}, 404
        
        user.delete()
        return {"message": "User deleted successfully"}, 200
    except Exception as e:
        return {"error": str(e)}, 400