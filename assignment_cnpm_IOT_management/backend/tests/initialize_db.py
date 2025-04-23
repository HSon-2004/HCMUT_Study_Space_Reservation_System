from pymongo import MongoClient
from datetime import datetime, timezone



# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["library_reservation"]

# Collections
users = db["users"]
rooms = db["rooms"]
bookings = db["bookings"]

# Sample Data

# 1. Users Collection
users_data = [
    {
        "id": "1",
        "username": "student1",
        "password": "hashed_password_1",  # Replace with actual hashed password
        "email": "student1@example.com",
        "role": "student",
    },
    {
        "id": "2",
        "username": "admin1",
        "password": "hashed_password_2",  # Replace with actual hashed password
        "email": "admin1@example.com",
        "role": "admin",
    },
]

# Insert users
users.insert_many(users_data)

# 2. Rooms Collection
rooms_data = [
    {
        "id": "101",
        "name": "Room A",
        "capacity": 10,
        "devices": ["Projector", "Whiteboard"],
        "status": "available",
        "datetime": [
            {
                "date": datetime(2025, 3, 23),
                "time_slot": {
                    "8:00-9:00": "available",
                    "9:00-10:00": "booked",
                    "10:00-11:00": "available",
                    "11:00-12:00": "available",
                    "13:00-14:00": "available",
                    "14:00-15:00": "booked",
                    "15:00-16:00": "available",
                    "16:00-17:00": "available",
                },
            }
        ],
    },
    {
        "id": "102",
        "name": "Room B",
        "capacity": 20,
        "devices": ["TV", "Conference Phone"],
        "status": "available",
        "datetime": [
            {
                "date": datetime(2025, 3, 23),
                "time_slot": {
                    "8:00-9:00": "available",
                    "9:00-10:00": "available",
                    "10:00-11:00": "available",
                    "11:00-12:00": "booked",
                    "13:00-14:00": "available",
                    "14:00-15:00": "available",
                    "15:00-16:00": "booked",
                    "16:00-17:00": "available",
                },
            }
        ],
    },
]

# Insert rooms
rooms.insert_many(rooms_data)

# 3. Bookings Collection
bookings_data = [
    {
        "id": "1",
        "user_id": "1",
        "room_id": "101",
        "checkin": datetime(2025, 3, 23, 9, 0),
        "checkout": datetime(2025, 3, 23, 10, 0),
        "status": "confirmed",
        "booked_slots": ["9:00-10:00"],
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    },
    {
        "id": "2",
        "user_id": "1",
        "room_id": "102",
        "checkin": datetime(2025, 3, 23, 15, 0),
        "checkout": datetime(2025, 3, 23, 16, 0),
        "status": "pending",
        "booked_slots": ["15:00-16:00"],
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    },
]

# Insert bookings
bookings.insert_many(bookings_data)

print("Database initialized successfully!")