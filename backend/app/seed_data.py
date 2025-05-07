from .models import User, Room, Booking
from .config import init_db
from .utils import generate_next_7_days_slots
from datetime import datetime, timezone, timedelta
from werkzeug.security import generate_password_hash
import uuid




admin = User(
    user_id=str(uuid.uuid4()),
    username="admin",
    email="admin@example.com",
    password=generate_password_hash("admin"),
    role="admin"
)

student = User(
    user_id=str(uuid.uuid4()),
    username="student",
    email="student@example.com",
    password=generate_password_hash("student"),
    role="student"
)

teacher = User(
    user_id=str(uuid.uuid4()),
    username="teacher",
    email="teacher@example.com",
    password=generate_password_hash("teacher"),
    role="teacher"
)


room1 = Room(
    room_id=str(uuid.uuid4()),
    name="Room 1",
    capacity="5",
    status="available",
    devices=[
        Room.Device(devices_name="Projector", count="1"),
        Room.Device(devices_name="Whiteboard", count="10"),
        Room.Device(devices_name="Speaker", count="2")
    ],
    slots=generate_next_7_days_slots()
)

room2 = Room(
    room_id=str(uuid.uuid4()),
    name="Room 2",
    capacity="10",
    status="available",
    devices=[
        Room.Device(devices_name="Projector", count="3"),
        Room.Device(devices_name="Whiteboard", count="9"),
        Room.Device(devices_name="Speaker", count="5")
    ],
    slots=generate_next_7_days_slots()

)

room3 = Room(
    room_id=str(uuid.uuid4()),
    name="Room 3",
    capacity="20",
    status="available",
    devices=[
        Room.Device(devices_name="Projector", count="2"),
        Room.Device(devices_name="Whiteboard", count="5"),
        Room.Device(devices_name="Speaker", count="10"),
        Room.Device(devices_name="Computer", count="20")
    ],
    slots=generate_next_7_days_slots()
)

room4 = Room(
    room_id=str(uuid.uuid4()),
    name="Room 4",
    capacity="15",
    status="available",
    devices=[
        Room.Device(devices_name="Projector", count="1"),
        Room.Device(devices_name="Whiteboard", count="3"),
        Room.Device(devices_name="Speaker", count="5"),
        Room.Device(devices_name="Computer", count="10")
    ],
    slots=generate_next_7_days_slots()
)

room5 = Room(
    room_id=str(uuid.uuid4()),
    name="Room 5",
    capacity="30",
    status="available",
    devices=[
        Room.Device(devices_name="Projector", count="2"),
        Room.Device(devices_name="Whiteboard", count="10"),
        Room.Device(devices_name="Speaker", count="15"),
        Room.Device(devices_name="Computer", count="30")
    ],
    slots=generate_next_7_days_slots()
)


booking1 = Booking(
    book_id=str(uuid.uuid4()),
    user_id=student.user_id,
    room_id=room2.room_id,
    user_name=student.username,
    room_name=room2.name,
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
    room3.save()
    room4.save()
    room5.save()
    booking1.save()