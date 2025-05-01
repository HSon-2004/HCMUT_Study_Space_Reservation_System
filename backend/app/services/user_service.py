from app.models.user import User
from mongoengine.errors import DoesNotExist

# def get_all_users():
#     return User.objects

def get_user_by_id(user_id):
    user = User.objects.get(user_id=user_id)
    return user

from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify
from app.models import User
from datetime import datetime, timezone
import uuid

class UserService:
    @staticmethod
    def create_user(user_data):
        # Check if user already exists
        if User.objects(email=user_data.email).first():
            return {"error": "Email already registered"}, 400

        if User.objects(username=user_data.username).first():
            return {"error": "Username already taken"}, 400

        # Create new user
        new_user = User(
            user_id=str(uuid.uuid4()),
            username=user_data.username,
            email=user_data.email,
            password=generate_password_hash(user_data.password),
            role=user_data.role
        )
        new_user.save()

        return {"message": "User created successfully", "user_id": new_user.user_id}, 201

    @staticmethod
    def login_user(email, password):
        user = User.objects(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return {"error": "Invalid email or password"}, 401

        return {
            "message": "Login successful",
            "user": {
                "user_id": user.user_id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }, 200
