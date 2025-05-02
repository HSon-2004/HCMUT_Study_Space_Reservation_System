from pydantic import BaseModel, EmailStr, constr
from typing import Literal

class UserCreate(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    password: constr(min_length=6)
    role: Literal['admin', 'student', 'teacher']

class UserLogin(BaseModel):
    email: EmailStr
    password: constr(min_length=3)


