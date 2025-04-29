from .models import User, Room, Booking
from .config import init_db
from datetime import datetime, timezone


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
    devices=[
        Room.Device(devices_name="Projector", devices_status="off"),
        Room.Device(devices_name="Whiteboard", devices_status="off"),
        Room.Device(devices_name="Speaker", devices_status="off")
    ],
    status="available",
    slots=[
        Room.Slot(
            date="2025-03-24",
            time_slot=[
                Room.Slot.TimeSlot(time="09:00", status="available"),
                Room.Slot.TimeSlot(time="10:00", status="available"),
                Room.Slot.TimeSlot(time="11:00", status="available"),
                Room.Slot.TimeSlot(time="12:00", status="available"),
                Room.Slot.TimeSlot(time="13:00", status="available"),
                Room.Slot.TimeSlot(time="14:00", status="available"),
                Room.Slot.TimeSlot(time="15:00", status="available"),
                Room.Slot.TimeSlot(time="16:00", status="available"),
                Room.Slot.TimeSlot(time="17:00", status="available"),
                Room.Slot.TimeSlot(time="18:00", status="available")
            ]
        )
    ]
)

room2 = Room(
    room_id="2",
    name="Room 2",
    capacity="10",
    devices=[
        Room.Device(devices_name="Projector", devices_status="on"),
        Room.Device(devices_name="Whiteboard", devices_status="on"),
        Room.Device(devices_name="Speaker", devices_status="on")
    ],
    status="booked",
    slots=[
        Room.Slot(
            date="2025-03-24",
            time_slot=[
                Room.Slot.TimeSlot(time="09:00", status="booked"),
                Room.Slot.TimeSlot(time="10:00", status="booked"),
                Room.Slot.TimeSlot(time="11:00", status="booked"),
                Room.Slot.TimeSlot(time="12:00", status="booked"),
                Room.Slot.TimeSlot(time="13:00", status="booked"),
                Room.Slot.TimeSlot(time="14:00", status="booked"),
                Room.Slot.TimeSlot(time="15:00", status="booked"),
                Room.Slot.TimeSlot(time="16:00", status="booked"),
                Room.Slot.TimeSlot(time="17:00", status="booked"),
                Room.Slot.TimeSlot(time="18:00", status="available")
            ]
        )
    ]

)


booking1 = Booking(
    book_id="1",
    user_id="2",
    room_id="2",
    checkin=datetime(2025, 3, 24, 9, 0, tzinfo=timezone.utc),
    checkout=datetime(2025, 3, 24, 17, 0, tzinfo=timezone.utc),
    status="checked_in",
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