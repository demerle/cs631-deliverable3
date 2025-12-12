from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Item(BaseModel):
    name: str

class Member(BaseModel):
    id: int
    memberType: str # without a default val, it will auto-validate and throw
              # a descriptive error if a value is not given in a post req
    firstName: str
    lastName: str
    joinDate: Optional[datetime]
    studentNumber: int
    academicLevel: str
    major1: str
    major2: str
    major3: str
    numMajors: int
    institutionalAffil: str
    biography: str
    department: str


class Project(BaseModel):
    id: int
    title: str
    startDate: Optional[datetime]
    endDate: Optional[datetime]
    duration: str
    status: str
    fac_id: int


class Grant(BaseModel):
    id: int
    startDate: Optional[datetime]
    endDate: Optional[datetime]


class Equipment(BaseModel):
    id: int
    name: str
    type: str
    purchaseDate: Optional[datetime]
    status: str


