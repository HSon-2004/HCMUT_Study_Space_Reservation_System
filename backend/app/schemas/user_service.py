from pydantic import BaseModel, EmailStr, constr

class UserCreate(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    password: constr(min_length=6)
    role: constr(regex='^(admin|student|teacher)$')

class UserLogin(BaseModel):
    email: EmailStr
    password: str
