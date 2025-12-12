import pyodbc
from fastapi import HTTPException

conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=DESKTOP-GLQL7F2;"
    "Database=CS631_Proj3;"
    "Trusted_Connection=yes;"
)

#tested and works
def fetchall_as_dict(cursor): #Yes I actually understand this code lol
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


#tested and works
def get_lab_member(cursor, fname: str, lname: str):
    cursor.execute("{CALL Get_Lab_Member (?, ?)}", (fname, lname))

    rows = fetchall_as_dict(cursor)
    return rows

#tested and works
def insert_lab_member(cursor, fname: str, lname: str, mtype: str, join_date) -> bool:
    cursor.execute("{CALL Insert_Lab_Member (?, ?, ?, ?)}", (fname, lname, mtype, join_date))

    has_result = cursor.nextset()

    if not has_result:
        raise RuntimeError("Insert_Lab_Member returned no result set")

    row = cursor.fetchone()
    cursor.connection.commit()

    print(row)
    if row:
        return row.MemberID


#tested and works
def update_lab_member(cursor, lab_member_id: int, fname: str, lname: str, mtype: str, join_date) -> bool:
    cursor.execute("{CALL Update_Lab_Member (?, ?, ?, ?, ?)}", (lab_member_id, fname, lname, mtype, join_date))

    cursor.connection.commit()
    return cursor.rowcount > 0

#tested and works
def delete_lab_member(cursor, lab_member_id: int) -> bool:
    cursor.execute("{CALL Delete_Lab_Member (?)}", lab_member_id)

    cursor.connection.commit()
    return cursor.rowcount > 0

# External Collaborator
def get_ext_collab(cursor, ext_collab_id: int):
    cursor.execute("{CALL Get_Ext_Collab (?)}", ext_collab_id)

    rows = fetchall_as_dict(cursor)
    return rows

def insert_ext_collab(cursor, ext_collab_id: int, inst_affil: str, bio: str):
    cursor.execute("{CALL Insert_Lab_Member (?, ?, ?)}", (ext_collab_id, inst_affil, bio))

    cursor.connection.commit()
    return cursor.rowcount > 0

def update_ext_collab(cursor, ext_collab_id: int, inst_affil: str, bio: str):
    cursor.execute("{CALL Update_Ext_Collab (?, ?, ?)}", (ext_collab_id, inst_affil, bio))

    cursor.connection.commit()
    return cursor.rowcount > 0

def delete_ext_collab(cursor, ext_collab_id: int):
    cursor.execute("{CALL Delete_Ext_Collab (?)}", ext_collab_id)

    cursor.connection.commit()
    return cursor.rowcount > 0

# Student
def get_student(cursor, student_member_id: int):
    cursor.execute("{CALL Get_Student (?)}", student_member_id)

    rows = fetchall_as_dict(cursor)
    return rows

def insert_student(cursor, student_member_id: int, academic_level: str):
    cursor.execute("{CALL Insert_Student (?, ?)}", (student_member_id, academic_level))

    cursor.connection.commit()
    return cursor.rowcount > 0

def update_student(cursor, student_member_id: int, academic_level: str):
    cursor.execute("{CALL Update_Student(?, ?)}", (student_member_id, academic_level))

    cursor.connection.commit()
    return cursor.rowcount > 0

def delete_student(cursor, student_member_id: int):
    cursor.execute("{CALL Delete_Student (?)}", student_member_id)

    cursor.connection.commit()
    return cursor.rowcount > 0

# Major
def get_major(cursor, student_member_id: int):
    cursor.execute("{CALL Get_Major (?)}", student_member_id)

    rows = fetchall_as_dict(cursor)
    return rows

def insert_major(cursor, student_member_id: int, major: str):
    cursor.execute("{CALL Insert_Major (?, ?)}", (student_member_id, major))

    cursor.connection.commit()
    return cursor.rowcount > 0

def update_major(cursor, student_member_id: int, major: str):
    cursor.execute("{CALL Update_Major (?, ?)}", (student_member_id, major))

    cursor.connection.commit()
    return cursor.rowcount > 0

def delete_major(cursor, student_member_id: int, major: str):
    cursor.execute("{CALL Delete_Major (?, ?)}", (student_member_id, major))

    cursor.connection.commit()
    return cursor.rowcount > 0

# Faculty
def get_faculty(cursor, fac_id: int):
    cursor.execute("{CALL Get_Faculty (?)}", fac_id)

    rows = fetchall_as_dict(cursor)
    return rows

def insert_faculty(cursor, fac_id: int, department: str)-> pyodbc.Row:
    cursor.execute("{CALL Insert_Faculty (?, ?)}", (fac_id, department))

    cursor.connection.commit()
    return cursor.rowcount > 0

def update_faculty(cursor, fac_id: int, department: str):
    cursor.execute("{CALL Update_Faculty(?, ?)}", (fac_id, department))

    cursor.connection.commit()
    return cursor.rowcount > 0

def delete_faculty(cursor, fac_id: int):
    cursor.execute("{CALL Delete_Faculty (?)}", fac_id)

    cursor.connection.commit()
    return cursor.rowcount > 0

# Projects
def get_project(cursor, project_title: str):
    cursor.execute("{CALL Get_Project (?)}", project_title)

    rows = fetchall_as_dict(cursor)
    return rows

def insert_project(cursor, project_title: str, proj_start_date, proj_end_date, proj_expected_duration: str, proj_status: str, fac_id: int):

    try:
        cursor.execute("{CALL Insert_Project (?, ?, ?, ?, ?, ?)}", (project_title, proj_start_date, proj_end_date , proj_expected_duration, proj_status, fac_id))

        cursor.connection.commit()
        return cursor.rowcount > 0
    except Exception as e:
        print(e)
        cursor.connection.rollback()
        raise HTTPException(status_code=404, detail=f"Database error: {str(e)}")


def update_project(cursor, proj_id: int, project_title: str, proj_start_date, proj_end_date,
                   proj_expected_duration: str, proj_status: str, fac_id: int):

    cursor.execute("{CALL Update_Project (?, ?, ?, ?, ?, ?, ?)}", (proj_id, project_title, proj_start_date, proj_end_date, proj_expected_duration, proj_status, fac_id))

    cursor.connection.commit()
    return cursor.rowcount > 0

def delete_project(cursor, proj_id: int):
    try:
        cursor.execute("{CALL Delete_Project (?)}", proj_id)

        cursor.connection.commit()
        return cursor.rowcount > 0
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail=f"Database error: {str(e)}")

# Project Status
def get_project_status(cursor, project_title: str):
    cursor.execute("{CALL Get_PStatus (?)}", project_title)

    rows = fetchall_as_dict(cursor)
    return rows

# Grant / Mentor Queries
def get_grant_projects_members(cursor, grant_id: int):
    cursor.execute("{CALL Get_Grant_Projects_Members (?)}", grant_id)

    rows = fetchall_as_dict(cursor)
    return rows

def get_mentors_project_relations(cursor):
    cursor.execute("{CALL Get_Mentors_Project_Relations}")

    rows = fetchall_as_dict(cursor)
    return rows

# Equipment Status & Users
def get_equipment_status(cursor, equip_name: str):
    cursor.execute("{CALL Get_EStatus (?)}", equip_name)

    rows = fetchall_as_dict(cursor)
    return rows

def get_equipment_users(cursor, equip_name: str):
    cursor.execute("{CALL Get_EUsers (?)}", equip_name)

    rows = fetchall_as_dict(cursor)
    return rows

# Equipment CRUD
def get_equipment(cursor, equipment_name: str):
    cursor.execute("{CALL Get_Equipment (?)}", equipment_name)

    rows = fetchall_as_dict(cursor)
    return rows

def insert_equipment(cursor, equip_type: str, equipment_name: str, purchase_date, equip_status: str):
    cursor.execute("{CALL Insert_Equipment (?, ?, ?, ?)}", (equip_type, equipment_name, purchase_date, equip_status))

    cursor.connection.commit()
    return cursor.rowcount > 0

def update_equipment(cursor, equip_id: int, equip_type: str, equipment_name: str,
                     purchase_date, equip_status: str):

    cursor.execute("{CALL Update_Equipment (?, ?, ?, ?, ?)}", (equip_id, equip_type, equipment_name, purchase_date, equip_status))

    cursor.connection.commit()
    return cursor.rowcount > 0

def delete_equipment(cursor, equip_id: int):
    cursor.execute("{CALL Delete_Equipment (?)}", equip_id)

    cursor.connection.commit()
    return cursor.rowcount > 0

# Usage
def get_usage(cursor, equip_id: int, lab_member_id: int):
    cursor.execute("{CALL Get_Usage (?, ?)}", (equip_id, lab_member_id))

    rows = fetchall_as_dict(cursor)
    return rows

def insert_usage(cursor, equip_id: int, use_start_date, use_end_date,
                 purpose_of_use: str, lab_member_id: int):
    cursor.execute("{CALL Insert_Usage (?, ?, ?, ?, ?)}", (equip_id, use_start_date, use_end_date, purpose_of_use, lab_member_id))

    cursor.connection.commit()
    return cursor.rowcount > 0

def update_usage(cursor, equip_id: int, use_start_date, use_end_date,
                 purpose_of_use: str, lab_member_id: int):
    cursor.execute("{CALL Update_Usage (?, ?, ?, ?, ?)}", (equip_id, use_start_date, use_end_date, purpose_of_use, lab_member_id))

    cursor.connection.commit()
    return cursor.rowcount > 0

def delete_usage(cursor, equip_id: int, lab_member_id: int):
    cursor.execute("{CALL Delete_Usage (?, ?)}", (equip_id, lab_member_id))

    cursor.connection.commit()
    return cursor.rowcount > 0

# Publications & Analytics
def get_busiest_publishers(cursor):
    cursor.execute("{CALL Get_Busiest_Publishers}")

    rows = fetchall_as_dict(cursor)
    return rows

def average_pub_per_major(cursor):
    cursor.execute("{CALL Average_Pub_Per_Major}")

    rows = fetchall_as_dict(cursor)
    return rows

def count_grant_projects_during_interval(cursor, grant_id: int, start_date, end_date):

    try:
        cursor.execute("{CALL Count_Grant_Projects_During_Interval (?, ?, ?)}", (grant_id, start_date, end_date))

        rows = fetchall_as_dict(cursor)
        return rows
    except Exception as e:
        print("\nretard\n")
        print(e)

def get_prolific_members(cursor, grant_id: int):
    cursor.execute("{CALL Get_Prolific_Members (?)}", grant_id)

    rows = fetchall_as_dict(cursor)
    return rows