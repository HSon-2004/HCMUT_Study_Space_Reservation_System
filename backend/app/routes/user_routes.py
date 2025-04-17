# from flask import Blueprint, request, jsonify
# from app.services import user_service
# from mongoengine.errors import DoesNotExist, ValidationError

# user_bp = Blueprint('user', __name__, url_prefix='/users')

# # GET /users - get all users (tạm thời cho mục đích test)
# @user_bp.route('', methods=['GET'])
# def get_users():
#     users = user_service.get_all_users()
#     return jsonify([u.to_mongo().to_dict() for u in users]), 200

# # GET /users/<user_id>
# @user_bp.route('/<user_id>', methods=['GET'])
# def get_user_by_id(user_id):
#     try:
#         user = user_service.get_user_by_id(user_id)
#         return jsonify(user.to_mongo().to_dict()), 200
#     except DoesNotExist:
#         return jsonify({'error': 'User not found'}), 404
