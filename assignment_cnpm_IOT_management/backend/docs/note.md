# API Endpoints

## 1. Authentication
POST /auth/login : Log in a user

POST /auth/logout : Log out a user (optional, as JWT is stateless)

## 2. Room Management

GET /rooms : Retrieve all rooms

GET /rooms/<room_id> : Retrieve a room by ID

POST /rooms/create : Create a new room (admin only)

PUT /rooms/<room_id> : Update an existing room (admin only)

DELETE /rooms/<room_id> : Delete a room (admin only)

## 3. Booking Management

GET /bookings : Retrieve all bookings for the logged-in user

GET /bookings/all : Xem tất cả booking (admin only)

GET /bookings/<booking_id> : Retrieve a booking by ID

POST /bookings : Create a new booking (requires `user_id` and `room_id` in the request body)

PUT /bookings/<booking_id> : Update an existing booking 

DELETE /bookings/<booking_id> : Cancel a booking

POST /bookings/<booking_id>/checkin : Check in to a room

## 4. IoT management

GET /rooms/<room_id>/devices : Retrieve all devices

PUT /rooms/<room_id>/devices/<devices_id> : Update device status

DELETE /rooms/<room_id>/devices/<devices_id> : Delete a device

POST /rooms/<room_id>/devices : Create a new device

# Database Schema

## 1. User
```json
{
    "id": "string",
    "username": "string",
    "password": "string (hash)",
    "email": "string",
    "role": "string", //[student, teacher, admin]
}
```
## 2. Room
```json
{
    "id": "string",
    "name": "string",
    "capacity": "integer",
    "devices" : [
        {
            "device_id": "string",
            "device_name": "string",
            "status": "string" //[on, off]
        }
    ],
    "status": "string", //[available, booked, unavailable]
    "slots": 
        [
            {
                "date": "datetime",
                "time_slot": {
                    "8:00-9:00": "status_time_slot", // [available, booked, unavailable]
                    "9:00-10:00": "status_time_slot",
                    "10:00-11:00": "status_time_slot",
                    "11:00-12:00": "status_time_slot",
                    "13:00-14:00": "status_time_slot",
                    "14:00-15:00": "status_time_slot",
                    "15:00-16:00": "status_time_slot",
                    "16:00-17:00": "status_time_slot",
                }
            }
        ]
}
```
## 3. Booking
```json
{
    "book_id": "string",
    "user_id": "string",
    "room_id": "string",
    "checkin": "datetime",
    "checkout": "datetime",
    "status": "strings", //[pending, confirmed, checked_in, cancelled]
    "booked_slots": ["string"],
    "created_at": "datetime",
    "updated_at": "datetime",
}
```
## Query Intructions

### 1. Query Users

**Retrieve all users:**
```
users = db["users"]
all_users = list(users.find())
print(all_users)
```
**Retrieve a user by id:**
```
user = users.find_one({"id": "string"})
print(user)
```
### 2. Query Rooms

**Retrieve all rooms:**
```
rooms = db["rooms"]
all_rooms = list(rooms.find())
print(all_rooms)
```

**Retrieve a room by id:**
```
room = rooms.find_one({"id": "string"})
print(room)
```

**Retrieve rooms with a specific status:**
```
available_rooms = list(rooms.find({"status": "available"}))
print(available_rooms)
```

**Retrieve rooms with a specific time slot available:**
```
rooms_with_slot = list(rooms.find({
    "slots.time_slot.8:00-9:00": "available"
}))
print(rooms_with_slot)
```

### 3. Query Bookings

**Retrieve all bookings:**
```
bookings = db["bookings"]
all_bookings = list(bookings.find())
print(all_bookings)
```

**Retrieve a booking by book_id:**
```
booking = bookings.find_one({"book_id": "string"})
print(booking)
```

**Retrieve bookings for a specific user:**
```
user_bookings = list(bookings.find({"user_id": "string"}))
print(user_bookings)
```

**Retrieve bookings for a specific room:**
```
room_bookings = list(bookings.find({"room_id": "string"}))
print(room_bookings)
```

**Retrieve bookings with a specific status:**
```
confirmed_bookings = list(bookings.find({"status": "confirmed"}))
print(confirmed_bookings)
```

### 4. Update Queries

**Update the status of a room:**
```
rooms.update_one({"id": "string"}, {"$set": {"status": "booked"}})
```

**Update the status of a booking:**
```
bookings.update_one({"book_id": "string"}, {"$set": {"status": "checked_in"}})
```

**Update a specific time slot in a room:**
```
rooms.update_one(
    {"id": "string", "slots.date": "2025-03-25"},
    {"$set": {"slots.$.time_slot.8:00-9:00": "booked"}}
)
```

### 5. Delete Queries

**Delete a user:**
```
users.delete_one({"id": "string"})
```

**Delete a room:**
```
rooms.delete_one({"id": "string"})
```

**Delete a booking:**
```
bookings.delete_one({"book_id": "string"})
```

### 6. Aggregation Queries

**Count the number of bookings for a specific room:**
```
booking_count = bookings.count_documents({"room_id": "string"})
print(booking_count)
```

**Group bookings by status:**
```
pipeline = [
    {"$group": {"_id": "$status", "count": {"$sum": 1}}}
]
status_counts = list(bookings.aggregate(pipeline))
print(status_counts)
```

### 7. Example Query for Time Slots

**Find rooms with available slots on a specific date:**
```
available_rooms = list(rooms.find({
    "slots": {
        "$elemMatch": {
            "date": "2025-03-25",
            "time_slot.8:00-9:00": "available"
        }
    }
}))
print(available_rooms)
``` 