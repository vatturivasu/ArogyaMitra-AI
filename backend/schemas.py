from pydantic import BaseModel

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class QueryInput(BaseModel):
    text: str
    language: str = "en"

class SchemeResponse(BaseModel):
    id: int
    name: str
    eligibility: str
    benefits: str

class CenterResponse(BaseModel):
    id: int
    name: str
    location: str
    contact: str
