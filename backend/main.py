from aiohttp.web_exceptions import HTTPOk
from fastapi import FastAPI, HTTPException
from services import *
from entities import *
import pyodbc

conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=DESKTOP-GLQL7F2;"
    "Database=CS631_Proj3;"
    "Trusted_Connection=yes;"
)

cursor = conn.cursor()

x = get_lab_member(cursor,  "Phineas", "Flynn")
print(x)
app = FastAPI()


items = []


@app.get("/")
def root():
    return {"Hello" : "World"}



@app.post("/1")
def problem1(member: Member): # Add member
    memberId = insert_lab_member(cursor, member.firstName, member.lastName, member.memberType, member.joinDate)
    if not memberId:
        raise HTTPException(status_code=400, detail="Error during insertion into lab members")

    else:
        if member.memberType == "Student":

            res2 = insert_student(cursor, memberId, member.academicLevel)
            if not res2:
                raise HTTPException(status_code=400, detail="Error during insertion into students")
            else:
                for major in (member.major1, member.major2, member.major3):
                    if major != "":
                        res3 = insert_major(cursor, memberId, major)
                        if not res3:
                            raise HTTPException(status_code=400, detail="Error during insertion into major")

                return {
                    "success": True
                }


        elif member.memberType == "Faculty":
            res2 = insert_faculty(cursor, memberId, member.department)
            if not res2:
                raise HTTPException(status_code=400, detail="Error during insertion into faculty")
            else:
                return {
                    "success": True
                }

        elif member.memberType == "External Collaborator":
            res2 = insert_ext_collab(cursor, memberId, member.institutionalAffil, member.bio)
            if not res2:
                raise HTTPException(status_code=400, detail="Error during insertion into ext collaborator")
            else:
                return {
                    "success": True
                }


@app.post("/2")
def problem2(member: Member): #Update Member
    res = update_lab_member(cursor, member.id, member.firstName, member.lastName, member.memberType, member.joinDate)
    if not res:
        raise HTTPException(status_code=400, detail="Error updating member")
    else:
        if (member.memberType == "Student"):
            res2 = update_student(cursor, member.id, member.academicLevel)
            if not res2:
                raise HTTPException(status_code=400, detail="Error updating students")
            else:
                return HTTPOk

        elif (member.memberType == "Faculty"):
            res2 = update_faculty(cursor, member.id, member.department)
            if not res2:
                raise HTTPException(status_code=400, detail="Error updating faculty")
            else:
                return HTTPOk

        elif (member.memberType == "External Collaborator"):
            res2 = update_ext_collab(cursor, member.id, member.institutionalAffil, member.bio)
            if not res2:
                raise HTTPException(status_code=400, detail="Error updating ext collaborator")
            else:
                return HTTPOk

@app.post("/3") #Remove member
def problem3(member: Member):
    res = delete_lab_member(cursor, member.id)
    if not res:
        raise HTTPException(status_code=400, detail="Error deleting member")
    else:
        return HTTPOk

@app.post("/4") #Show members who have worked on projects funded by a given grant
def problem4(grant: Grant):
    res = get_grant_projects_members(cursor, grant.id)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding projects/members with given grant")
    else:
        return res


@app.get("/5")
def problem5():
    res = get_mentors_project_relations(cursor)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding projects/members with given grant")
    else:
        return res


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

@app.get("/13")
def problem13(equipment: Equipment):
    res = get_equipment_status(cursor, equipment.name)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding equipment status")
    else:
        return res


@app.get("/14")
def problem14(): #highest number of publications
    res = get_busiest_publishers(cursor)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding equipment status")
    else:
        return res

@app.get("/15")
def problem15():
    res = average_pub_per_major(cursor)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding equipment status")
    else:
        return res

@app.post("/16")
def problem16(grant: Grant):
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
        return items[item_id]
    else:
        raise HTTPException(status_code=404, detail="Item not found")
    
