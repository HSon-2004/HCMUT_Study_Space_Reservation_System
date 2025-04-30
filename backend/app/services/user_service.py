from app.models.user import User
from mongoengine.errors import DoesNotExist

# def get_all_users():
#     return User.objects

def get_user_by_id(user_id):
    user = User.objects.get(user_id=user_id)
    return user
