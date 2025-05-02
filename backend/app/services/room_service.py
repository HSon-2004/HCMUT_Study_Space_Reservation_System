from app.models import Room
from app.schemas import RoomSchema
from app.utils import generate_next_7_days_slots
import uuid


room_schema = RoomSchema()
rooms_schema = RoomSchema(many=True)


def get_all_rooms():
    rooms = Room.objects()
    return rooms_schema.dump(rooms)

def get_room_by_id(room_id):
    room = Room.objects(room_id=room_id).first()
    return room_schema.dump(room) if room else None

def create_room(data):
    room = Room(
        room_id=str(uuid.uuid4()),
        name=data.get("name"),
        capacity=data.get("capacity"),
        status=data.get("status"),
        devices=data.get("devices"),
        slots=generate_next_7_days_slots()
    )
    room.save()
    return room_schema.dump(room)

def update_room(room_id, data):
    room = Room.objects(room_id=room_id).first()
    if not room:
        return None
    room.update(
        name = data.get("name"),
        capacity = data.get("capacity"),
        status = data.get("status"),
        devices = data.get("devices"),
    )
    room.reload()
    return room_schema.dump(room)

def delete_room(room_id):
    room = Room.objects(room_id=room_id).first()
    if not room:
        return False
    room.delete()
    return True
