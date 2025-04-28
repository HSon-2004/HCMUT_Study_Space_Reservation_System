from schemas.room_schema import Room

def get_all_rooms():
    return [room.to_json() for room in Room.objects]

def get_room_by_id(room_id):
    room = Room.objects(id=room_id).first()
    return room.to_json() if room else None

def create_room(data):
    room = Room(**data)
    room.save()
    return room.to_json()

def update_room(room_id, data):
    room = Room.objects(id=room_id).first()
    if not room:
        return None
    room.update(**data)
    room.reload()
    return room.to_json()

def delete_room(room_id):
    room = Room.objects(id=room_id).first()
    if not room:
        return False
    room.delete()
    return True
