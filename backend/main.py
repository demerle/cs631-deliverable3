from fastapi import FastAPI, HTTPException
from pydantic import BaseModel



app = FastAPI()

class Item(BaseModel):
    name: str

class Member(BaseModel):
    id: int
    memberType: str # without a default val, it will auto-validate and throw
              # a descriptive error if a value is not given in a post req
    firstName: str
    last_name: str
    title: str
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
    startDate: str
    endDate: str
    duration: str
    status: str


class Grant(BaseModel):
    id: int


class Equipment(BaseModel):
    id: int
    name: str
    type: str
    purchaseDate: str
    status: str




items = []


@app.get("/")
def root():
    return {"Hello" : "World"}



@app.post("/1")
def problem1(member: Member):
    return 0



@app.post("/2")
def problem2(member: Member):
    return 0


@app.post("/3")
def problem3(member: Member):
    return 0

@app.post("/4")
def problem4(member: Member):
    return 0


@app.post("/5")
def problem5(member: Member):
    return 0


@app.post("/6")
def problem6(member: Member):
    return 0


@app.post("/7")
def problem7(member: Member):
    return 0


@app.post("/8")
def problem8(member: Member):
    return 0


@app.post("/9")
def problem9(member: Member):
    return 0


@app.post("/10")
def problem10(member: Member):
    return 0


@app.post("/11")
def problem11(member: Member):
    return 0

@app.post("/12")
def problem12(member: Member):
    return 0

@app.post("/13")
def problem13(member: Member):
    return 0

@app.post("/14")
def problem14(member: Member):
    return 0

@app.post("/15")
def problem15(member: Member):
    return 0

@app.post("/16")
def problem16(member: Member):
    return 0

@app.post("/17")
def problem17(member: Member):
    return 0

@app.post("/18")
def problem18(member: Member):
    return 0

@app.post("/19")
def problem19(member: Member):
    return 0

@app.post("/20")
def problem20(member: Member):
    return 0





@app.post("/items")
def create_item(item: Item):
    items.append(item)
    return items

@app.get("/items", response_model=list[Item])
def list_items(limit: int = 10):
    return items[0:limit]
    

@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int) -> Item:
    if item_id < len(items):
        return items[items_id]
    else:
        raise HTTPException(status_code=404, detail="Item not found")
    
