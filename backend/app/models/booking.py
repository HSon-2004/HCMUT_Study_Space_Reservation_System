from mongoengine import Document, StringField, DateTimeField
from datetime import datetime, timezone

class Booking(Document):
    STATUS_CHOICES = ('confirmed', 'checked_in')

    book_id = StringField(required=True, unique=True)
    user_id = StringField(required=True)
    room_id = StringField(required=True)
    user_name = StringField(required=True)
    room_name = StringField(required=True)
    checkin = DateTimeField(required=True)
    checkout = DateTimeField(required=True)
    status = StringField(required=True, choices=STATUS_CHOICES)
    book_slot = StringField(required=True)

    created_at = DateTimeField(default=datetime.now(timezone.utc))
    updated_at = DateTimeField(default=datetime.now(timezone.utc))

    meta = {
        'collection': 'bookings',
        'ordering': ['-created_at'],
    }

    def save(self, *args, **kwargs):
        self.updated_at = datetime.now(timezone.utc)
        return super().save(*args, **kwargs)
