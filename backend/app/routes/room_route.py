from flask import Blueprint, request, jsonify
from app.services import room_service
from app.utils import token_required

room_bp = Blueprint("room_bp", __name__)



@room_bp.route("/rooms", methods=["GET"])
def get_rooms():
    return jsonify(room_service.get_all_rooms()), 200

@room_bp.route("/rooms/<room_id>", methods=["GET"])
def get_room(room_id):
    room = room_service.get_room_by_id(room_id)
    if not room:
        return jsonify({"error": "Room not found"}), 404
    return jsonify(room), 200

@room_bp.route("/rooms/create", methods=["POST"])
@token_required
def create_new_room():
    role = request.role
    if role != "admin":
        return jsonify({"error": "Unauthorized"}), 403
    
    room = room_service.create_room(request.json)
    return jsonify(room), 201

@room_bp.route("/rooms/<room_id>/update", methods=["PUT"])
@token_required
def update_existing_room(room_id):
    role = request.role
    if role != "admin":
        return jsonify({"error": "Unauthorized"}), 403
    
    room = room_service.update_room(room_id, request.json)
    if not room:
        return jsonify({"error": "Room not found"}), 404
    return jsonify(room), 200

@room_bp.route("/rooms/<room_id>", methods=["DELETE"])
@token_required
def delete_existing_room(room_id):
    role = request.role
    if role != "admin":
        return jsonify({"error": "Unauthorized"}), 403
    
    success = room_service.delete_room(room_id)
    if not success:
        return jsonify({"error": "Room not found"}), 404
    return jsonify({"message": "Room deleted"}), 200
