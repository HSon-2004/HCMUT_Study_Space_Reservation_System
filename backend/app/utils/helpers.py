from app.models import User, Room
from app.config import Config
from datetime import datetime, timezone, timedelta
import jwt

def serialize_booking(booking):
    return {
        # "id": str(booking.id),
        "book_id": booking.book_id,
        "user_id": booking.user_id,
        "room_id": booking.room_id,
        "user_name": booking.user_name,
        "room_name": booking.room_name,
        "checkin": booking.checkin.isoformat(),
        "checkout": booking.checkout.isoformat(),
        "status": booking.status,
        "book_slot": booking.book_slot,
        "created_at": booking.created_at.isoformat(),
        "updated_at": booking.updated_at.isoformat()
    }

def serialize_user(user):
    return {
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "password": user.password,
        "role": user.role,
    }

def generate_next_7_days_slots():
    slots = []
    base_times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
    
    for i in range(7):
        day = datetime.now(timezone.utc).date() + timedelta(days=i)
        time_slots = [Room.Slot.TimeSlot(time=t, status="available") for t in base_times]
        slot = Room.Slot(date=day.isoformat(), time_slot=time_slots)
        slots.append(slot)

    return slots