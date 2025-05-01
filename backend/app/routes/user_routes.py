from flask import Blueprint, request, jsonify
from mongoengine.errors import DoesNotExist, ValidationError
from bson import ObjectId
from app.schemas import UserCreate, UserLogin
from app.services import UserService
from app.config import Config
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
