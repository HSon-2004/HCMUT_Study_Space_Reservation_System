from flask import Blueprint, request, jsonify
from services import room_service

room_bp = Blueprint("room_bp", __name__)

def is_admin():
    return request.headers.get("X-Admin", "").lower() == "true"

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
def create_new_room():
    if not is_admin():
        return jsonify({"error": "Admin privileges required"}), 403
    room = room_service.create_room(request.json)
    return jsonify(room), 201

@room_bp.route("/rooms/<room_id>", methods=["PUT"])
def update_existing_room(room_id):
    if not is_admin():
        return jsonify({"error": "Admin privileges required"}), 403
    room = room_service.update_room(room_id, request.json)
    if not room:
        return jsonify({"error": "Room not found"}), 404
    return jsonify(room), 200

@room_bp.route("/rooms/<room_id>", methods=["DELETE"])
def delete_existing_room(room_id):
    if not is_admin():
        return jsonify({"error": "Admin privileges required"}), 403
    success = room_service.delete_room(room_id)
    if not success:
        return jsonify({"error": "Room not found"}), 404
    return jsonify({"message": "Room deleted"}), 200
