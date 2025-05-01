from datetime import datetime
from mongoengine.errors import DoesNotExist, ValidationError
from app.models import Booking
from app.models import Room
import jwt
from app.config import Config
import uuid



def get_all_bookings():
    return Booking.objects()

def get_user_bookings(user_id):
    bookings = Booking.objects(user_id=user_id)
    return bookings

def get_booking_by_id(booking_id):
    booking = Booking.objects.get(book_id=booking_id)
    return booking

def get_bookings_by_room(room_id):
    bookings = Booking.objects(room_id=room_id)
    return bookings

def create_booking(user_id, data):
    # Lấy thông tin  từ dữ liệu gửi lên
    room_id = data.get('room_id')
    checkin = data.get('checkin')  
    checkout = data.get('checkout')  
    book_slot = data.get('book_slot')  

    if not room_id or not checkin or not checkout or not book_slot:
        raise KeyError("Missing required fields: room_id, checkin, checkout, book_slot")


    # Chuyển string time thành datetime object
    try:
        checkin_dt = datetime.fromisoformat(checkin)
        checkout_dt = datetime.fromisoformat(checkout)
    except ValueError:
        raise ValidationError("Invalid datetime format. Use ISO format.")

    # Kiểm tra room tồn tại
    room = Room.objects(room_id=room_id).first()
    if not room:
        raise ValidationError("Room does not exist")

    # Đảm bảo book_slot phải hợp lệ
    available_slots = room.slots[0].time_slot  # Lấy danh sách giờ trong room (giả định cấu trúc là như vậy)
    available_times = [slot.time for slot in available_slots if slot.status == 'available']
    requested_times = book_slot.split(", ")

    # Kiểm tra xem tất cả các slot yêu cầu có tồn tại và có sẵn không
    for time in requested_times:
        if time not in available_times:
            raise ValidationError(f"Time slot {time} is not available")


    # Create the booking
    booking = Booking(
        book_id=str(uuid.uuid4()),  # Thêm new_book_id
        user_id=user_id,
        room_id=room_id,
        checkin=checkin_dt,
        checkout=checkout_dt,
        room_name=room.name,
        status = data.get('status', 'confirmed'),  # Gán trạng thái mặc định là confirmed
        book_slot=book_slot
    )
    booking.save()
    return booking


def update_booking(booking_id, data):
    booking = Booking.objects.get(book_id=booking_id)

    if 'checkin' in data:
        try:
            booking.checkin = datetime.fromisoformat(data['checkin'])
        except ValueError:
            raise ValidationError("Invalid checkin datetime format. Use ISO format.")

    if 'checkout' in data:
        try:
            booking.checkout = datetime.fromisoformat(data['checkout'])
        except ValueError:
            raise ValidationError("Invalid checkout datetime format. Use ISO format.")

    if 'status' in data:
        if data['status'] not in Booking.STATUS_CHOICES:
            raise ValidationError(f"Invalid status. Must be one of: {Booking.STATUS_CHOICES}")
        booking.status = data['status']

    if 'book_slot' in data:
        booking.book_slot = data['book_slot']

    booking.save()
    return booking


def cancel_booking(user_id, role, booking_id):
    # Kiểm tra booking có thuộc về user không
    if role != 'admin':
        booking = Booking.objects.get(book_id=booking_id, user_id=user_id)
        if not booking:
            raise ValidationError("Booking not found or does not belong to the user")
    else:
        booking = Booking.objects.get(book_id=booking_id)
        if not booking:
            raise ValidationError("Booking not found")

    try:
        booking.delete()
    except DoesNotExist:
        raise DoesNotExist("Booking not found")

def checkin_booking(user_id, booking_id):
    booking = Booking.objects.get(book_id=booking_id, user_id=user_id)
    if not booking:
        raise ValidationError("Booking not found or does not belong to the user")
    
    try:
        if booking.status not in ["confirmed"]:
            raise ValidationError("Only confirmed bookings can be checked in.")
        booking.status = "checked_in"
        booking.save()
    except DoesNotExist:
        raise DoesNotExist("Booking not found")
