from mongoengine import Document, StringField, IntField
from marshmallow import Schema, fields, validate


class Room(Document):
    name = StringField(required=True)
    type = StringField(required=True)
    capacity = IntField(required=True)

    def to_json(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "type": self.type,
            "capacity": self.capacity
        }



class DeviceSchema(Schema):
    # Xác thực thiết bị
    devices_name = fields.Str(required=True)
    devices_status = fields.Str(required=True, validate=validate.OneOf(["on", "off"]))

class TimeSlotSchema(Schema):
    time = fields.Str(required=True)
    status = fields.Str(required=True, validate=validate.OneOf(["available", "booked", "unavailable"]))

class SlotSchema(Schema):
    date = fields.Str(required=True)
    time_slot = fields.List(fields.Nested(TimeSlotSchema))

class RoomSchema(Schema):
    # Xác thực phòng
    room_id = fields.Str(required=True)
    name = fields.Str(required=True)
    capacity = fields.Int(required=True)
    devices = fields.List(fields.Nested(DeviceSchema))
    status = fields.Str(required=True, validate=validate.OneOf(["available", "booked", "unavailable"]))
    slots = fields.List(fields.Nested(SlotSchema))