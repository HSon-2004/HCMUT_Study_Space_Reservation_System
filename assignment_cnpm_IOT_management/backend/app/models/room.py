from mongoengine import Document, StringField, ListField, EmbeddedDocument, EmbeddedDocumentField

class Room(Document):
    room_id = StringField(required=True, unique=True)
    name = StringField(required=True, unique=True)
    capacity = StringField(required=True)
    
    devices = ListField(EmbeddedDocumentField('Device'))
    class Device(EmbeddedDocument):
        devices_name = StringField(required=True)
        devices_status = StringField(required=True)
    
    status = StringField(required=True)
    
    slots = ListField(EmbeddedDocumentField('Slot'))
    class Slot(EmbeddedDocument):
        date = StringField(required=True)
        time_slot = ListField(EmbeddedDocumentField('TimeSlot'))
        class TimeSlot(EmbeddedDocument):
            time = StringField(required=True)
            status = StringField(required=True)

        

