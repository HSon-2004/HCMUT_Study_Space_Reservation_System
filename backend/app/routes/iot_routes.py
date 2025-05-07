from flask import Blueprint, request, jsonify
from app.services import IoTService
from app.utils import token_required


iot_bp = Blueprint("iot", __name__)

@iot_bp.route("/rooms/<room_id>/devices", methods=["GET"])
def get_devices(room_id):
    """Lấy danh sách thiết bị."""
    try:
        devices = IoTService.get_devices(room_id)
        return jsonify(devices), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 404

@iot_bp.route("/rooms/<room_id>/devices", methods=["POST"])
@token_required
def create_device(room_id):
    """Tạo thiết bị mới."""
    role = request.role
    if role != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    try:
        data = request.get_json()
        device = IoTService.create_device(room_id, data)
        return jsonify(device), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@iot_bp.route("/rooms/<room_id>/devices/<devices_name>", methods=["PUT"])
@token_required
def update_device(room_id, devices_name):
    """Cập nhật thiết bị."""
    role = request.role
    if role != "admin":
        return jsonify({"error": "Unauthorized"}), 403
    
    try:
        data = request.get_json()
        device = IoTService.update_device(room_id, devices_name, data)
        return jsonify(device), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@iot_bp.route("/rooms/<room_id>/devices/<devices_name>", methods=["DELETE"])
@token_required
def delete_device(room_id, devices_name):
    """Xóa thiết bị."""
    role = request.role
    if role != "admin":
        return jsonify({"error": "Unauthorized"}), 403
    
    try:
        result = IoTService.delete_device(room_id, devices_name)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400