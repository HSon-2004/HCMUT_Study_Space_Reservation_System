from mongoengine import Document, StringField

class User(Document):
    user_id = StringField(required=True, unique=True)
    username = StringField(required=True, unique=True)
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    role = StringField(required=True)


