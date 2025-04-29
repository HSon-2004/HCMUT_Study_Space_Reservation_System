from app.models import Room
from app.schemas import RoomSchema


room_schema = RoomSchema()
rooms_schema = RoomSchema(many=True)


def get_all_rooms():
    rooms = Room.objects()
    return rooms_schema.dump(rooms)

def get_room_by_id(room_id):
    room = Room.objects(room_id=room_id).first()
    return room_schema.dump(room) if room else None

def create_room(data):
    room = Room(**data)
    room.save()
    return room_schema.dump(room)

def update_room(room_id, data):
    room = Room.objects(room_id=room_id).first()
    if not room:
        return None
    room.update(**data)
    room.reload()
    return room_schema.dump(room)

def delete_room(room_id):
    room = Room.objects(room_id=room_id).first()
    if not room:
        return False
    room.delete()
    return True
