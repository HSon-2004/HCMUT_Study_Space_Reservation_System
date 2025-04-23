from app.models.room import Room
from app.schemas.room_schema import DeviceSchema
from mongoengine.errors import NotUniqueError

class IoTService:
    @staticmethod
    def get_devices(room_id):
        """Lấy danh sách thiết bị trong phòng."""
        room = Room.objects(room_id=room_id).first()
        if not room:
            raise ValueError("Không tìm thấy phòng")
        return DeviceSchema(many=True).dump(room.devices)

    @staticmethod
    def create_device(room_id, data):
        """Tạo thiết bị mới."""
        schema = DeviceSchema()
        validated_data = schema.load(data)
        room = Room.objects(room_id=room_id).first()
        if not room:
            raise ValueError("Không tìm thấy phòng")
        
        # Kiểm tra trùng devices_name
        if any(device.devices_name == validated_data["devices_name"] for device in room.devices):
            raise ValueError("Tên thiết bị đã tồn tại trong phòng")
        
        room.devices.append(Room.Device(**validated_data))
        try:
            room.save()
            return schema.dump(validated_data)
        except NotUniqueError:
            raise ValueError("Lỗi khi lưu thiết bị")

    @staticmethod
    def update_device(room_id, devices_name, data):
        """Cập nhật thiết bị."""
        schema = DeviceSchema(partial=True)
        validated_data = schema.load(data)
        room = Room.objects(room_id=room_id).first()
        if not room:
            raise ValueError("Không tìm thấy phòng")
        
        device = next((d for d in room.devices if d.devices_name == devices_name), None)
        if not device:
            raise ValueError("Không tìm thấy thiết bị")
        
        for key, value in validated_data.items():
            setattr(device, key, value)
        
        room.save()
        return DeviceSchema().dump(device)

    @staticmethod
    def delete_device(room_id, devices_name):
        """Xóa thiết bị."""
        room = Room.objects(room_id=room_id).first()
        if not room:
            raise ValueError("Không tìm thấy phòng")
        
        device = next((d for d in room.devices if d.devices_name == devices_name), None)
        if not device:
            raise ValueError("Không tìm thấy thiết bị")
        
        room.devices.remove(device)
        room.save()
        return {"message": f"Thiết bị {devices_name} đã được xóa"}