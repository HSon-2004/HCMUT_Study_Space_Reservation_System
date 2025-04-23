from flask import Blueprint, request, jsonify
from services.room_service import *
from flask_pymongo import PyMongo

room_bp = Blueprint("room_bp", __name__)

def is_admin():
    return request.headers.get("X-Admin", "").lower() == "true"

# Register Mongo within blueprint setup
mongo = PyMongo()
rooms_collection = None

def init_app(app):
    global rooms_collection
    mongo.init_app(app)
    rooms_collection = mongo.db.rooms

@room_bp.route("/rooms", methods=["GET"])
def get_rooms():
    return jsonify(get_all_rooms(rooms_collection)), 200

@room_bp.route("/rooms/<room_id>", methods=["GET"])
def get_room(room_id):
    room = get_room_by_id(rooms_collection, room_id)
    if not room:
        return jsonify({"error": "Room not found"}), 404
    return jsonify(room), 200

@room_bp.route("/rooms/create", methods=["POST"])
def create_new_room():
    if not is_admin():
        return jsonify({"error": "Admin privileges required"}), 403
    return jsonify(create_room(rooms_collection, request.json)), 201

@room_bp.route("/rooms/<room_id>", methods=["PUT"])
def update_existing_room(room_id):
    if not is_admin():
        return jsonify({"error": "Admin privileges required"}), 403
    room = update_room(rooms_collection, room_id, request.json)
    if not room:
        return jsonify({"error": "Room not found"}), 404
    return jsonify(room), 200

@room_bp.route("/rooms/<room_id>", methods=["DELETE"])
def delete_existing_room(room_id):
    if not is_admin():
        return jsonify({"error": "Admin privileges required"}), 403
    success = delete_room(rooms_collection, room_id)
    if not success:
        return jsonify({"error": "Room not found"}), 404
    return jsonify({"message": "Room deleted"}), 200
