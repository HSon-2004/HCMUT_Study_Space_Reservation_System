from app.models import User

def serialize_booking(booking):
    return {
        # "id": str(booking.id),
        "book_id": booking.book_id,
        "user_id": booking.user_id,
        "room_id": booking.room_id,
        "checkin": booking.checkin.isoformat(),
        "checkout": booking.checkout.isoformat(),
        "status": booking.status,
        "book_slot": booking.book_slot,
        "created_at": booking.created_at.isoformat(),
        "updated_at": booking.updated_at.isoformat()
    }

def IsAdmin(user_id):
    user = User.objects(user_id=user_id).first()
    return user and user.role == "admin"