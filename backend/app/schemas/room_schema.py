from marshmallow import Schema, fields, validate

class TimeSlotSchema(Schema):
    time = fields.String(required=True)
    status = fields.String(required=True)

class SlotSchema(Schema):
    date = fields.String(required=True)
    time_slot = fields.List(fields.Nested(TimeSlotSchema), required=True)

class DeviceSchema(Schema):
    devices_name = fields.String(required=True)
    count = fields.String(required=True)

class RoomSchema(Schema):
    room_id = fields.String(required=True)
    name = fields.String(required=True)
    capacity = fields.String(required=True)
    status = fields.String(required=True)

    devices = fields.List(fields.Nested(DeviceSchema), required=True)
    slots = fields.List(fields.Nested(SlotSchema), required=True)
