from mongoengine import Document, StringField, DateTimeField
from datetime import datetime, timezone

class Booking(Document):
    book_id = StringField(required=True, unique=True)
    user_id = StringField(required=True)
    room_id = StringField(required=True)
    checkin = DateTimeField(required=True)  
    checkout = DateTimeField(required=True) 
    status = StringField(required=True)
    book_slot = StringField(required=True)
    created_at = DateTimeField(default=datetime.now(timezone.utc))  
    updated_at = DateTimeField(default=datetime.now(timezone.utc)) 
