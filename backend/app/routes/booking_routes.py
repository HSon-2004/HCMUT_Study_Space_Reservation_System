from flask import Blueprint, request, jsonify
from mongoengine.errors import DoesNotExist, ValidationError
from app.services import booking_service
from app.utils.helpers import serialize_booking
from app.models.booking import Booking

booking_bp = Blueprint('booking', __name__, url_prefix='/bookings')


# GET /bookings - Lấy tất cả booking của user hiện tại
@booking_bp.route('', methods=['GET'])
def get_user_bookings():
    user_id = request.headers.get("User-ID")
    if not user_id:
        return jsonify({"error": "Missing User-ID"}), 400

    bookings = Booking.objects(user_id=user_id)
    return jsonify([serialize_booking(b) for b in bookings]), 200


# GET /bookings/all - Chỉ admin
@booking_bp.route('/all', methods=['GET'])
def get_all_bookings():
    user_id = request.headers.get("User-ID")
    if not user_id or str(user_id) != "20":  # user_id = 20 là admin
        return jsonify({"error": "Unauthorized"}), 403

    bookings = booking_service.get_all_bookings()
    return jsonify([serialize_booking(b) for b in bookings]), 200


# GET /bookings/<booking_id> - Lấy thông tin 1 booking
@booking_bp.route('/<booking_id>', methods=['GET'])
def get_booking_by_id(booking_id):
    try:
        booking = booking_service.get_booking_by_id(booking_id)
        return jsonify(serialize_booking(booking)), 200
    except DoesNotExist:
        return jsonify({'error': 'Booking not found'}), 404


# POST /bookings - Tạo mới 1 booking
@booking_bp.route('', methods=['POST'])
def create_booking():
    data = request.get_json()
    user_id = request.headers.get("User-ID")
    if not user_id:
        return jsonify({'error': 'Missing User-ID'}), 400

    try:
        booking = booking_service.create_booking(user_id=user_id, data=data)
        return jsonify({'message': 'Booking created successfully', 'id': str(booking.id)}), 201
    except (ValidationError, KeyError) as e:
        return jsonify({'error': str(e)}), 400


# PUT /bookings/<booking_id> - Cập nhật booking
@booking_bp.route('/<booking_id>', methods=['PUT'])
def update_booking(booking_id):
    data = request.get_json()
    try:
        booking = booking_service.update_booking(booking_id, data)
        return jsonify({'message': 'Booking updated successfully'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Booking not found'}), 404


# DELETE /bookings/<booking_id> - Xóa booking
@booking_bp.route('/<booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    try:
        booking_service.cancel_booking(booking_id)
        return jsonify({'message': 'Booking cancelled successfully'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Booking not found'}), 404


# POST /bookings/<booking_id>/checkin - Check-in phòng
@booking_bp.route('/<booking_id>/checkin', methods=['POST'])
def checkin_booking(booking_id):
    try:
        booking_service.checkin_booking(booking_id)
        return jsonify({'message': 'Checked in successfully'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Booking not found'}), 404
    except ValidationError as e:
        return jsonify({'error': str(e)}), 400
