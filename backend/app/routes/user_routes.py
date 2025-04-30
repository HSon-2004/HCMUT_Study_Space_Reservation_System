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
