from .models import User, Room, Booking
from .config import init_db
from datetime import datetime, timezone, timedelta


def generate_next_7_days_slots():
    slots = []
    base_times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
    
    for i in range(7):
        day = datetime.now(timezone.utc).date() + timedelta(days=i)
        time_slots = [Room.Slot.TimeSlot(time=t, status="available") for t in base_times]
        slot = Room.Slot(date=day.isoformat(), time_slot=time_slots)
        slots.append(slot)

    return slots

admin = User(
    user_id="20",
    username="admin",
    email="admin@example.com",
    password="admin",
    role="admin"
)

student = User(
    user_id="2",
    username="student",
    email="student@example.com",
    password="student",
    role="student"
)

teacher = User(
    user_id="3",
    username="teacher",
    email="teacher@example.com",
    password="teacher",
    role="teacher"
)


room1 = Room(
    room_id="1",
    name="Room 1",
    capacity="5",
    status="available",
    devices=[
        Room.Device(devices_name="Projector", devices_status="off"),
        Room.Device(devices_name="Whiteboard", devices_status="off"),
        Room.Device(devices_name="Speaker", devices_status="off")
    ],
    slots=generate_next_7_days_slots()
)

room2 = Room(
    room_id="2",
    name="Room 2",
    capacity="10",
    status="available",
    devices=[
        Room.Device(devices_name="Projector", devices_status="on"),
        Room.Device(devices_name="Whiteboard", devices_status="on"),
        Room.Device(devices_name="Speaker", devices_status="on")
    ],
    slots=generate_next_7_days_slots()

)


booking1 = Booking(
    book_id="1",
    user_id="2",
    room_id="2",
    checkin=datetime(2025, 5, 1, 9, 0, tzinfo=timezone.utc),
    checkout=datetime(2025, 5, 1, 17, 0, tzinfo=timezone.utc),
    status="confirmed",
    book_slot="09:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00",
    created_at=datetime.now(timezone.utc),  
    updated_at=datetime.now(timezone.utc)  
)

def seed_data():
    init_db()

    User.drop_collection()
    Room.drop_collection()
    Booking.drop_collection()

    admin.save()
    student.save()
    teacher.save()
    room1.save()
    room2.save()
    booking1.save()