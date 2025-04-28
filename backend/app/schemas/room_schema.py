from mongoengine import Document, StringField, IntField

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
