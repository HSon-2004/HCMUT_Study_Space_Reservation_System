def serialize_booking(booking):
    return {
        # "id": str(booking.id),
        "book_id": booking.book_id,
        "user_id": booking.user_id,
        "room_id": booking.room_id,
        "checkin": booking.checkin.isoformat(),
        "checkout": booking.checkout.isoformat(),
        "status": booking.status,
        "book_slot": booking.book_slot,
        "created_at": booking.created_at.isoformat(),
        "updated_at": booking.updated_at.isoformat()
    }
