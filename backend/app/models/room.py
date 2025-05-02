from mongoengine import Document, StringField, ListField, EmbeddedDocument, EmbeddedDocumentField

class Room(Document):
    STATUS_CHOICES = ('available', 'unavailable')
    room_id = StringField(required=True, unique=True)
    name = StringField(required=True, unique=True)
    capacity = StringField(required=True)
    status = StringField(required=True, choices=STATUS_CHOICES)

    devices = ListField(EmbeddedDocumentField('Device'))
    class Device(EmbeddedDocument):
        devices_name = StringField(required=True)
        count = StringField(required=True)
    
   
    slots = ListField(EmbeddedDocumentField('Slot'))
    class Slot(EmbeddedDocument):
        date = StringField(required=True)
        time_slot = ListField(EmbeddedDocumentField('TimeSlot'))
        class TimeSlot(EmbeddedDocument):
            time = StringField(required=True)
            status = StringField(required=True)


