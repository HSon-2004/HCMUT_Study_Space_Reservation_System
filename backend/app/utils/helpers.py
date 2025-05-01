from app.models import User
from app.config import Config
from datetime import datetime
import jwt

def serialize_booking(booking):
    return {
        # "id": str(booking.id),
        "book_id": booking.book_id,
        "user_id": booking.user_id,
        "room_id": booking.room_id,
        "room_name": booking.room_name,
        "checkin": booking.checkin.isoformat(),
        "checkout": booking.checkout.isoformat(),
        "status": booking.status,
        "book_slot": booking.book_slot,
        "created_at": booking.created_at.isoformat(),
        "updated_at": booking.updated_at.isoformat()
    }

