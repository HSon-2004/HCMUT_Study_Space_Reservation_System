from datetime import datetime
from mongoengine.errors import DoesNotExist, ValidationError
from app.models import Booking
from app.models import Room


def get_all_bookings():
    return Booking.objects()


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

    # Tạo book_id duy nhất
    last_booking = Booking.objects.order_by('-book_id').first()
    if last_booking and last_booking.book_id.isdigit():
        new_book_id = str(int(last_booking.book_id) + 1)
    else:
        new_book_id = "1"

    # Create the booking
    booking = Booking(
        book_id=new_book_id,  # Thêm new_book_id
        user_id=user_id,
        room_id=room_id,
        checkin=checkin_dt,
        checkout=checkout_dt,
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


def cancel_booking(booking_id):
    try:
        booking = Booking.objects.get(book_id=booking_id)
        booking.status = "cancelled"
        booking.save()
    except DoesNotExist:
        raise DoesNotExist("Booking not found")

def checkin_booking(booking_id):
    try:
        booking = Booking.objects.get(book_id=booking_id)
        if booking.status not in ["confirmed"]:
            raise ValidationError("Only confirmed bookings can be checked in.")
        booking.status = "checked_in"
        booking.save()
    except DoesNotExist:
        raise DoesNotExist("Booking not found")