from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services import *
from entities import *
import pyodbc

from services import get_major, get_mentors_project_relations

conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=DESKTOP-GLQL7F2;"
    "Database=CS631_Proj3;"
    "Trusted_Connection=yes;"
)

cursor = conn.cursor()

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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




    if member.memberType == "Student":
        res2 = update_student(cursor, member.id, member.academicLevel)
        if not res2:
            raise HTTPException(status_code=400, detail="Error updating students")

        for major in (member.major1, member.major2, member.major3):
            if major != "":
                res3 = update_major(cursor, member.id, major)
                if not res3:
                    raise HTTPException(status_code=400, detail="Error during updating major")
        return {
            "success": True
        }

    elif member.memberType == "Faculty":
        res2 = update_faculty(cursor, member.id, member.department)
        if not res2:
            raise HTTPException(status_code=400, detail="Error updating faculty")

        return {
            "success": True
        }

    elif member.memberType == "External Collaborator":
        res2 = update_ext_collab(cursor, member.id, member.institutionalAffil, member.bio)
        if not res2:
            raise HTTPException(status_code=400, detail="Error updating ext collaborator")

        return {
            "success": True
        }




@app.post("/3") #Remove member
def problem3(member: Member):
    res = delete_lab_member(cursor, member.id)
    if not res:
        raise HTTPException(status_code=400, detail="Error deleting member")

    return {
        "success": True
    }

@app.post("/4") #Show members who have worked on projects funded by a given grant
def problem4(grant: Grant):
    res = get_grant_projects_members(cursor, grant.id)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding projects/members with given grant")

    return res


@app.post("/5")
def problem5():
    res = get_mentors_project_relations(cursor)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding project/mentor relations")

    return res


@app.post("/6") # Add project
def problem6(project: Project):
    res = insert_project(cursor, project.title, project.startDate, project.endDate, project.duration, project.status, project.fac_id)
    if not res:
        raise HTTPException(status_code=400, detail="Error during insertion into projects")

    return {
        "success": True
    }

@app.post("/7") #Update Project
def problem7(project: Project):
    res = update_project(cursor, project.id, project.title, project.startDate, project.endDate, project.duration, project.status, project.fac_id)

    if not res:
        raise HTTPException(status_code=400, detail="Error during updating projects")

    return {
        "success": True
    }


@app.post("/8") #Remove Project
def problem8(project: Project):
    res = delete_project(cursor, project.id)
    if not res:
        raise HTTPException(status_code=400, detail="Error deleting project")

    return {
        "success": True
    }


@app.post("/9") #Display Project Status
def problem9(project: Project):
    res = get_project_status(cursor, project.title)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding project status")
    else:
        return res

@app.post("/10") #Add Equipment
def problem10(equip: Equipment):
    res = insert_equipment(cursor, equip.type, equip.name, equip.purchaseDate, equip.status)
    if not res:
        raise HTTPException(status_code=400, detail="Error during insertion into equipment")

    return {
        "success": True
    }


@app.post("/11") ##Update Equipment
def problem11(equip: Equipment):
    res = update_equipment(cursor, equip.id, equip.type, equip.name, equip.purchaseDate, equip.status)
    if not res:
        raise HTTPException(status_code=400, detail="Error during updating equipment")

    return {
        "success": True
    }

@app.post("/12") #Remove Equipment
def problem12(equip: Equipment):
    res = delete_equipment(cursor, equip.id)
    if not res:
        raise HTTPException(status_code=400, detail="Error deleting equipment")

    return {
        "success": True
    }

@app.post("/13") #Display Equipment Status
def problem13(equipment: Equipment):
    res = get_equipment_status(cursor, equipment.name)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding equipment status")
    else:
        return res


@app.post("/14")
def problem14(): #name of members with the highest number of publications
    res = get_busiest_publishers(cursor)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding equipment status")
    else:
        return res

@app.post("/15") #Calculate the average number of publications per major
def problem15():
    res = average_pub_per_major(cursor)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding equipment status")
    else:
        return res

@app.post("/16") #Find the number of project that were funded by a grant and were active during a given period of time
def problem16(grant: Grant):
    res = count_grant_projects_during_interval(cursor, grant.id, grant.startDate, grant.endDate)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding equipment status")
    else:
        return res

@app.post("/17") #Find the three most prolific members who have worked on a project funded by a given grant
def problem17(grant: Grant):
    res = get_prolific_members(cursor, grant.id)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding equipment status")
    else:
        return res

@app.post("/18") #Show members who have worked on projects funded by a given grant
def problem18(grant: Grant):
    res = get_grant_projects_members(cursor, grant.id)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding equipment status")
    else:
        return res

@app.post("/19") #Show mentorship relationships among members who have worked on the same project
def problem19():
    res = get_mentors_project_relations(cursor)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding equipment status")
    else:
        return res

@app.post("/20") #Show members currently using a given piece of equipment and the projects they are working on
def problem20(equip: Equipment):
    res = get_equipment_users(cursor, equip.name)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding equipment status")
    else:
        return res


@app.post("/21")
def problem21(member: Member):
    res = get_lab_member(cursor, member.firstName, member.lastName)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding lab member")
    else:
        return res

@app.post("/22")
def problem22(project: Project):
    res = get_project(cursor, project.title)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding lab member")
    else:
        return res

@app.post("/23")
def problem23(equip: Equipment):
    res = get_equipment(cursor, equip.name)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding lab member")
    else:
        return res

@app.post("/24")
def problem24(usage: Usage):
    res = get_usage(cursor, usage.equip_id, usage.member_id)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding lab member")
    else:
        return res

@app.post("/25")
def problem25(usage: Usage):
    res = insert_usage(cursor, usage.equip_id, usage.start_date, usage.end_date, usage.purpose, usage.member_id)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding lab member")
    else:
        return res

@app.post("/26")
def problem26(usage: Usage):
    res = update_usage(cursor, usage.equip_id, usage.start_date, usage.end_date, usage.purpose, usage.member_id)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding lab member")
    else:
        return res

@app.post("/27")
def problem27(usage: Usage):
    res = delete_usage(cursor, usage.equip_id, usage.member_id)
    if not res:
        raise HTTPException(status_code=404, detail="Error finding lab member")
    else:
        return res

