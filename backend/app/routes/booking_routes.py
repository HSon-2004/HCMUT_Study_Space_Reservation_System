from flask import Blueprint, request, jsonify
from mongoengine.errors import DoesNotExist, ValidationError
from app.services import booking_service
from app.utils import serialize_booking, token_required
from app.models.booking import Booking

booking_bp = Blueprint('booking', __name__)



# GET /bookings - Lấy tất cả booking của user hiện tại
@booking_bp.route('/bookings', methods=['GET'])
@token_required
def get_user_bookings():
    user_id = request.user_id
    bookings = booking_service.get_user_bookings(user_id)
    return jsonify([serialize_booking(b) for b in bookings]), 200


# GET /bookings/all - Chỉ admin
@booking_bp.route('/bookings/all', methods=['GET'])
@token_required
def get_all_bookings():
    role = request.role
    if role != 'admin':
        return jsonify({"error": "Unauthorized"}), 403

    bookings = booking_service.get_all_bookings()
    return jsonify([serialize_booking(b) for b in bookings]), 200


# GET /bookings/room/<room_id> - Lấy tất cả booking của 1 phòng
@booking_bp.route('/bookings/room/<room_id>', methods=['GET'])
def get_bookings_by_room(room_id):
    bookings = booking_service.get_bookings_by_room(room_id)
    return jsonify([serialize_booking(b) for b in bookings]), 200

# GET /bookings/<booking_id> - Lấy thông tin 1 booking
@booking_bp.route('/bookings/<booking_id>', methods=['GET'])
def get_booking_by_id(booking_id):
    try:
        booking = booking_service.get_booking_by_id(booking_id)
        return jsonify(serialize_booking(booking)), 200
    except DoesNotExist:
        return jsonify({'error': 'Booking not found'}), 404


# POST /bookings - Tạo mới 1 booking
@booking_bp.route('/bookings/create', methods=['POST'])
@token_required
def create_booking():
    data = request.get_json()
    user_id = request.user_id
    user_name = request.username
    try:
        booking = booking_service.create_booking(user_id, user_name, data)
        return jsonify({'message': 'Booking created successfully', 'book_id': str(booking.book_id)}), 201
    except (ValidationError, KeyError) as e:
        print(e)
        return jsonify({'error': str(e)}), 400


# PUT /bookings/<booking_id> - Cập nhật booking
@booking_bp.route('/bookings/<booking_id>', methods=['PUT'])
@token_required
def update_booking(booking_id):
    data = request.get_json()
    role = request.role
    if role != 'admin':
        return jsonify({"error": "Unauthorized"}), 403
    
    try:
        booking = booking_service.update_booking(booking_id, data)
        return jsonify({'message': 'Booking updated successfully'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Booking not found'}), 404


# DELETE /bookings/<booking_id> - Xóa booking
@booking_bp.route('/bookings/<booking_id>', methods=['DELETE'])
@token_required
def delete_booking(booking_id):
    user_id = request.user_id
    role = request.role
    try:
        booking_service.cancel_booking(user_id, role, booking_id)
        return jsonify({'message': 'Booking cancelled successfully'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Booking not found'}), 404


# POST /bookings/<booking_id>/checkin - Check-in phòng
@booking_bp.route('/bookings/<booking_id>/checkin', methods=['POST'])
@token_required
def checkin_booking(booking_id):
    user_id = request.user_id
    try:
        booking_service.checkin_booking(user_id, booking_id)
        return jsonify({'message': 'Checked in successfully'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Booking not found'}), 404
    except ValidationError as e:
        return jsonify({'error': str(e)}), 400


