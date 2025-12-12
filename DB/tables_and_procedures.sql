
-- create
CREATE TABLE LAB_MEMBER (
  		 MemberID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    	 FirstName VARCHAR(30),
   		 LastName VARCHAR (30),
    	 MemberType VARCHAR(30),
    	 JoinDate DATE
);

CREATE TABLE PUBLICATION (
    PubID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    PubTitle VARCHAR(255),
    Venue VARCHAR(255),
    Month VARCHAR(10),
    Year VARCHAR(4),
    DOI VARCHAR(255)
);

CREATE TABLE EQUIPMENT (
    EID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    EType VARCHAR(255),
    EName VARCHAR(255),
    PurchaseDate DATE,
    EStatus VARCHAR(255)
);

CREATE TABLE GRANTS (
    GID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    GrantSource VARCHAR(255),
    Budget VARCHAR(255),
    GStartDate DATE,
    GDuration VARCHAR(50)
);

CREATE TABLE MENTORS (
    MentorID INT,
    MenteeID INT,
    MStartDate DATE,
    MEndDate DATE,
    MentorJob VARCHAR(50),
    MenteeJob VARCHAR(50),
    CONSTRAINT FK_MentorID FOREIGN KEY (MentorID)
    REFERENCES LAB_MEMBER(MemberID),
    CONSTRAINT FK_MenteeID FOREIGN KEY (MenteeID)
    REFERENCES LAB_MEMBER(MemberID),
    CONSTRAINT CHK_Relation CHECK (NOT (MentorJob='Student' AND MenteeJob='Faculty')),
    CONSTRAINT PK_MENTORS PRIMARY KEY (MentorID,MenteeID)
);

CREATE TABLE FACULTY (
    MemberID INT NOT NULL PRIMARY KEY,
    Department VARCHAR(50),
    CONSTRAINT FK_MemberID1 FOREIGN KEY (MemberID)
    REFERENCES LAB_MEMBER(MemberID)
);

CREATE TABLE STUDENT (
    MemberID INT NOT NULL PRIMARY KEY,
    StudentNumber INT IDENTITY(1,1),
    AcademicLevel VARCHAR(255),
    CONSTRAINT FK_MemberID2 FOREIGN KEY (MemberID)
    REFERENCES LAB_MEMBER(MemberID)
);

CREATE TABLE EXT_COLLAB (
    MemberID INT NOT NULL PRIMARY KEY,
    Inst_Affil VARCHAR(255),
    Biography VARCHAR(255),
    CONSTRAINT FK_MemberID3 FOREIGN KEY (MemberID)
    REFERENCES LAB_MEMBER(MemberID)
);

CREATE TABLE USES (
    EID INT NOT NULL,
    UStartDate DATE,
    UEndDate DATE,
    PurposeOfUse VARCHAR(255),
    MemberID INT NOT NULL,
    CONSTRAINT FK_EID FOREIGN KEY (EID)
    REFERENCES EQUIPMENT(EID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_MemberID FOREIGN KEY (MemberID)
    REFERENCES LAB_MEMBER(MemberID),
    CONSTRAINT PK_USES PRIMARY KEY (EID,MemberID)
);

CREATE TABLE AUTHORS (
    PubID INT NOT NULL,
    MemberID INT,
    CONSTRAINT FK_PubID FOREIGN KEY (PubID)
    REFERENCES PUBLICATION(PubID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_MemberID4 FOREIGN KEY (MemberID)
    REFERENCES LAB_MEMBER(MemberID),
    CONSTRAINT PK_AUTHORS PRIMARY KEY (PubID,MemberID)
);

CREATE TABLE MAJOR (
    MemberID INT NOT NULL,
    Major VARCHAR(255),
    CONSTRAINT FK_MemberID5 FOREIGN KEY (MemberID)
    REFERENCES STUDENT(MemberID),
    CONSTRAINT PK_MAJOR PRIMARY KEY (MemberID,Major)
);

CREATE TABLE PROJECTS (
    PID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    PTitle VARCHAR(255),
    PStartDate DATE,
    PEndDate DATE,
    PExpectedDuration VARCHAR(50),
    PStatus VARCHAR(255),
    FacultyID INT,
    CONSTRAINT FK_FacultyID FOREIGN KEY (FacultyID)
    REFERENCES FACULTY(MemberID)
    ON DELETE SET NULL
);

CREATE TABLE WORKS_ON (
    PID INT,
    MemberID INT,
    Hours INT,
    Role VARCHAR(255),
    CONSTRAINT FK_PID FOREIGN KEY (PID)
    REFERENCES PROJECTS(PID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_MemberID6 FOREIGN KEY (MemberID)
    REFERENCES LAB_MEMBER(MemberID),
    CONSTRAINT PK_WORKS_ON PRIMARY KEY (PID,MemberID)
);

CREATE TABLE FUNDS (
    GID INT,
    PID INT,
    CONSTRAINT FK_GID FOREIGN KEY (GID)
    REFERENCES GRANTS(GID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT FK_PID2 FOREIGN KEY (PID)
    REFERENCES PROJECTS(PID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT PK_FUNDS PRIMARY KEY (GID,PID)
);
GO
-- insert

-- QUERIES!!! 

-- Query, add, update, and remove Lab Members - DONE

-- TRIGGER TO CASCADE DELETION OF LAB_MEMBER
CREATE TRIGGER Delete_Lab_Mbr
ON LAB_MEMBER
INSTEAD OF DELETE
AS
BEGIN
    SET NOCOUNT ON;
    
    DELETE 
    FROM MENTORS
    WHERE MenteeID IN (SELECT MemberID FROM DELETED) OR MentorID IN (SELECT MemberID FROM DELETED);
    
    DELETE 
    FROM MAJOR
    WHERE MemberID IN (SELECT MemberID FROM DELETED);
    
    DELETE 
    FROM FACULTY
    WHERE MemberID IN (SELECT MemberID FROM DELETED);
    
    DELETE 
    FROM STUDENT
    WHERE MemberID IN (SELECT MemberID FROM DELETED);
    
    DELETE 
    FROM EXT_COLLAB
    WHERE MemberID IN (SELECT MemberID FROM DELETED);
    
    DELETE 
    FROM USES
    WHERE MemberID IN (SELECT MemberID FROM DELETED);
    
    DELETE 
    FROM AUTHORS
    WHERE MemberID IN (SELECT MemberID FROM DELETED);
    
    DELETE 
    FROM WORKS_ON
    WHERE MemberID IN (SELECT MemberID FROM DELETED);
    
    DELETE
    FROM LAB_MEMBER
    WHERE MemberID IN (SELECT MemberID FROM DELETED)
END;
GO

CREATE PROCEDURE Get_Lab_Member (@FName varchar(30), @LName varchar(30))
AS BEGIN
  SELECT MemberID, FirstName, LastName, MemberType, JoinDate
  FROM LAB_MEMBER
  WHERE FirstName = @FName AND LastName = @LName;
END;
GO

CREATE PROCEDURE Insert_Lab_Member (@FName varchar(30), @LName varchar(30), @MType VARCHAR(30), @MJoinDate DATE)
AS BEGIN
  INSERT INTO LAB_MEMBER (FirstName, LastName, MemberType, JoinDate)
  VALUES (@FName, @LName, @MType, @MJoinDate);
  
  SELECT SCOPE_IDENTITY() AS MemberID;
END;
GO

CREATE PROCEDURE Update_Lab_Member (@Lab_Member_ID INT, @FName varchar(30), @LName varchar(30), @MType VARCHAR(30), @MJoinDate DATE)
AS BEGIN
  UPDATE LAB_MEMBER 
  SET FirstName = @FName, LastName = @LName, MemberType = @MType, JoinDate = @MJoinDate
  WHERE MemberID = @Lab_Member_ID;
END;
GO

CREATE PROCEDURE Delete_Lab_Member (@Lab_Member_ID INT)
AS BEGIN
  DELETE FROM LAB_MEMBER
  WHERE MemberID = @Lab_Member_ID;
END;
GO

-- Query, add, update, and remove Ext_Collab - DONE
CREATE PROCEDURE Get_Ext_Collab (@Ext_Collab_ID INT)
AS BEGIN
  SELECT MemberID, Inst_Affil, Biography
  FROM EXT_COLLAB
  WHERE MemberID = @Ext_Collab_ID;
END;
GO

CREATE PROCEDURE Insert_Ext_Collab (@Ext_Collab_ID INT, @In_Aff varchar(255), @Bio varchar(255))
AS BEGIN
  IF (NOT EXISTS (Select 1 FROM STUDENT S WHERE S.MemberID = @Ext_Collab_ID)
      AND NOT EXISTS (Select 1 FROM FACULTY F WHERE F.MemberID = @Ext_Collab_ID))
  BEGIN
    INSERT INTO EXT_COLLAB (MemberID, Inst_Affil, Biography)
    VALUES (@Ext_Collab_ID, @In_Aff, @Bio);
  END;
END;
GO

CREATE PROCEDURE Update_Ext_Collab (@Ext_Collab_ID INT, @In_Aff varchar(255), @Bio varchar(255))
AS BEGIN
  UPDATE EXT_COLLAB 
  SET Inst_Affil = @In_Aff, Biography = @Bio
  WHERE MemberID = @Ext_Collab_ID;
END;
GO

CREATE PROCEDURE Delete_Ext_Collab (@Ext_Collab_ID INT)
AS BEGIN
  DELETE FROM EXT_COLLAB
  WHERE MemberID = @Ext_Collab_ID;
END;
GO

-- Query, add, update, and remove Student - DONE
CREATE PROCEDURE Get_Student (@Student_Member_ID INT)
AS BEGIN
  SELECT MemberID, StudentNumber, AcademicLevel
  FROM STUDENT
  WHERE MemberID = @Student_Member_ID;
END;
GO

CREATE PROCEDURE Insert_Student (@Student_Member_ID INT, @AcaLvl varchar(255))
AS BEGIN
  IF (NOT EXISTS (Select 1 FROM EXT_COLLAB E WHERE E.MemberID = @Student_Member_ID)
      AND NOT EXISTS (Select 1 FROM FACULTY F WHERE F.MemberID = @Student_Member_ID))
  BEGIN
    INSERT INTO STUDENT (MemberID, AcademicLevel)
    VALUES (@Student_Member_ID, @AcaLvl);
  END;
END;
GO

CREATE PROCEDURE Update_Student (@Student_Member_ID INT, @AcaLvl varchar(255))
AS BEGIN
  UPDATE STUDENT 
  SET AcademicLevel = @AcaLvl
  WHERE MemberID = @Student_Member_ID;
END;
GO

CREATE PROCEDURE Delete_Student (@Student_Member_ID INT)
AS BEGIN
  DELETE FROM STUDENT
  WHERE MemberID = @Student_Member_ID;
END;
GO

-- Query, add, and remove Major - DONE
CREATE PROCEDURE Get_Major (@Student_Member_ID INT)
AS BEGIN
  SELECT MemberID, Major
  FROM MAJOR
  WHERE MemberID = @Student_Member_ID
  ORDER BY Major;
END;
GO

CREATE PROCEDURE Insert_Major (@Student_Member_ID INT, @Mjr VARCHAR(255))
AS BEGIN
  INSERT INTO MAJOR (MemberID, Major)
  VALUES (@Student_Member_ID, @Mjr);
END;
GO

CREATE PROCEDURE Update_Major (@Student_Member_ID INT, @Mjr VARCHAR(255))
AS BEGIN
  UPDATE MAJOR (MemberID, Major)
  SET Major = @Mjr
  WHERE MemberID = @Student_Member_ID
END;
GO

CREATE PROCEDURE Delete_Major (@Student_Member_ID INT, @Mjr VARCHAR(255))
AS BEGIN
  DELETE FROM MAJOR
  WHERE MemberID = @Student_Member_ID AND Major = @Mjr;
END;
GO

-- Query, add, update, and remove Faculty - DONE
CREATE PROCEDURE Get_Faculty (@Fac_ID INT)
AS BEGIN
  SELECT MemberID, Department
  FROM FACULTY
  WHERE MemberID = @Fac_ID;
END;
GO

CREATE PROCEDURE Insert_Faculty (@Fac_ID INT, @Dept VARCHAR(50))
AS BEGIN
  IF (NOT EXISTS (Select 1 FROM EXT_COLLAB E WHERE E.MemberID = @Fac_ID)
      AND NOT EXISTS (Select 1 FROM STUDENT S WHERE S.MemberID = @Fac_ID))
  BEGIN
    INSERT INTO FACULTY (MemberID, Department)
    VALUES (@Fac_ID, @Dept);
  END;
END;
GO

CREATE PROCEDURE Update_Faculty (@Fac_ID INT, @Dept VARCHAR(50))
AS BEGIN
  UPDATE FACULTY 
  SET Department = @Dept
  WHERE MemberID = @Fac_ID;
END;
GO

CREATE PROCEDURE Delete_Faculty (@Fac_ID INT)
AS BEGIN
  DELETE FROM FACULTY
  WHERE MemberID = @Fac_ID;
END;
GO

-- Query, add, update, and remove projects. -DONE
CREATE PROCEDURE Get_Project (@Project_Title varchar(255))
AS BEGIN
  SELECT PID, PTitle, PStartDate, PEndDate, PExpectedDuration, PStatus, FacultyID
  FROM PROJECTS
  WHERE PTitle = @Project_Title;
END;
GO

CREATE PROCEDURE Insert_Project (@Project_Title VARCHAR(255), @Proj_Start_Date DATE, @Proj_End_Date DATE, @Proj_Ex_Dur VARCHAR(50), @Proj_Status VARCHAR(255), @Fac_ID INT)
AS BEGIN
  INSERT INTO PROJECTS (PTitle, PStartDate, PEndDate, PExpectedDuration, PStatus, FacultyID)
  VALUES (@Project_Title, @Proj_Start_Date, @Proj_End_Date, @Proj_Ex_Dur, @Proj_Status, @Fac_ID);
END;
GO

CREATE PROCEDURE Update_Project (@Proj_ID INT, @Project_Title VARCHAR(255), @Proj_Start_Date DATE, @Proj_End_Date DATE, @Proj_Ex_Dur VARCHAR(50), @Proj_Status VARCHAR(255), @Fac_ID INT)
AS BEGIN
  UPDATE PROJECTS
  SET PTitle = @Project_Title, PStartDate = @Proj_Start_Date, PEndDate = @Proj_End_Date,PExpectedDuration = @Proj_Ex_Dur, PStatus = @Proj_Status, FacultyID = @Fac_ID
  WHERE PID = @Proj_ID;
END;
GO

CREATE PROCEDURE Delete_Project (@Proj_ID INT)
AS BEGIN
  DELETE FROM PROJECTS
  WHERE PID = @Proj_ID;
END;
GO

--Display the status of a project. - DONE
CREATE PROCEDURE Get_PStatus (@ProjectTitle varchar(255))
AS BEGIN
  SELECT PTitle, PStatus
  FROM PROJECTS
  WHERE PTitle = @ProjectTitle;
END;
GO

--Show members who have worked on projects funded by a given grant. - DONE
CREATE PROCEDURE Get_Grant_Projects_Members (@GrantID INT)
AS
BEGIN
  SELECT DISTINCT L.MemberID, L.FirstName, L.LastName
  FROM LAB_MEMBER L
  JOIN WORKS_ON W ON W.MemberID = L.MemberID
  JOIN FUNDS F ON F.PID = W.PID
  WHERE @GrantID = F.GID
  ORDER BY L.LastName, L.FirstName, L.MemberID;
END;
GO

--Show mentorship relations among members who have worked on the same project. - DONE
CREATE PROCEDURE Get_Mentors_Project_Relations
AS
BEGIN
  SELECT DISTINCT M.MentorID, L1.FirstName AS MentorFName, L1.LastName AS MentorLName, M.MenteeID, L2.FirstName AS MenteeFName, L2.LastName AS MenteeLName
  FROM Mentors M 
  JOIN WORKS_ON W1 ON W1.MemberID = M.MentorID
  JOIN WORKS_ON W2 ON W2.MemberID = M.MenteeID
  JOIN LAB_MEMBER L1 ON M.MentorID = L1.MemberID
  JOIN LAB_MEMBER L2 ON M.MenteeID = L2.MemberID
  WHERE W1.PID = W2.PID
  ORDER BY MentorLName, MentorFName, M.MentorID, MenteeLName, MenteeFName, M.MenteeID;
END;
GO

--Show status of a piece of equipment - DONE
CREATE PROCEDURE Get_EStatus (@EquipName varchar(255))
AS BEGIN
  SELECT EName, EStatus
  FROM EQUIPMENT
  WHERE EName = @EquipName;
END;
GO

--Show members currently using a given piece of equipment and the projects they are working on. - DONE
CREATE PROCEDURE Get_EUsers (@EquipName varchar(255))
AS BEGIN
  SELECT DISTINCT L.MemberID, L.FirstName, L.LastName, P.PID, P.PTitle
  FROM PROJECTS P
  JOIN WORKS_ON W ON W.PID = P.PID
  JOIN LAB_MEMBER L ON L.MemberID = W.MemberID
  JOIN USES U ON U.MemberID = L.MemberID
  JOIN EQUIPMENT E ON E.EID = U.EID
  WHERE EName = @EquipName
  ORDER BY L.LastName, L.FirstName, L.MemberID, P.PTitle;
END;
GO

-- Query, add, update, and remove equipment - DONE
CREATE PROCEDURE Get_Equipment (@Equipment_Name varchar(255))
AS BEGIN
  SELECT EID, EType, EName, PurchaseDate, EStatus
  FROM EQUIPMENT
  WHERE EName = @Equipment_Name;
END;
GO

CREATE PROCEDURE Insert_Equipment (@Equip_Type VARCHAR(255), @Equipment_Name VARCHAR(255), @Purchase_Date DATE, @Equip_Status VARCHAR(255))
AS BEGIN
  INSERT INTO EQUIPMENT (EType, EName, PurchaseDate, EStatus)
  VALUES (@Equip_Type, @Equipment_Name, @Purchase_Date, @Equip_Status);
END;
GO

CREATE PROCEDURE Update_Equipment (@Equip_ID INT, @Equip_Type VARCHAR(255), @Equipment_Name VARCHAR(255), @Purchase_Date DATE, @Equip_Status VARCHAR(255))
AS BEGIN
  UPDATE EQUIPMENT
  SET EType = @Equip_Type, EName = @Equipment_Name, PurchaseDate = @Purchase_Date, EStatus = @Equip_Status
  WHERE EID = @Equip_ID;
END;
GO

CREATE PROCEDURE Delete_Equipment (@Equip_ID INT)
AS BEGIN
  DELETE FROM EQUIPMENT
  WHERE EID = @Equip_ID;
END;
GO

-- Query, add, update, and remove equipment
CREATE PROCEDURE Get_Usage (@Equip_ID INT, @Lab_Member_ID INT)
AS BEGIN
  SELECT EID, UStartDate, UEndDate, PurposeOfUse, MemberID
  FROM USES
  WHERE EID = @Equip_ID AND MemberID = @Lab_Member_ID;
END;
GO

CREATE PROCEDURE Insert_Usage (@Equip_ID INT, @Use_Start_Date DATE, @Use_End_Date DATE, @Purpose_Of_Use VARCHAR(255), @Lab_Member_ID INT)
AS BEGIN
  INSERT INTO USES (EID, UStartDate, UEndDate, PurposeOfUse, MemberID)
  VALUES (@Equip_ID, @Use_Start_Date, @Use_End_Date, @Purpose_Of_Use, @Lab_Member_ID);
END;
GO

CREATE PROCEDURE Update_Usage (@Equip_ID INT, @Use_Start_Date DATE, @Use_End_Date DATE, @Purpose_Of_Use VARCHAR(255), @Lab_Member_ID INT)
AS BEGIN
  UPDATE USES
  SET UStartDate = @Use_Start_Date, UEndDate = @Use_End_Date, PurposeOfUse = @Purpose_Of_Use
  WHERE EID = @Equip_ID AND MemberID = @Lab_Member_ID;
END;
GO

CREATE PROCEDURE Delete_Usage (@Equip_ID INT, @Lab_Member_ID INT)
AS BEGIN
  DELETE FROM USES
  WHERE EID = @Equip_ID AND MemberID = @Lab_Member_ID;
END;
GO


--Identify the name of the member(s) with the highest number of publications.
CREATE PROCEDURE Get_Busiest_Publishers 
AS BEGIN
  SELECT TOP 1 WITH TIES L.FirstName, L.LastName
  FROM LAB_MEMBER L
  JOIN AUTHORS A ON L.MemberID = A.MemberID
  GROUP BY L.MemberID, L.FirstName, L.LastName
  ORDER BY COUNT(PubID) DESC
END;
GO

--Calculate the average number of student publications per major.
CREATE PROCEDURE Average_Pub_Per_Major
AS BEGIN
  SELECT Major, Avg(CAST(P.P_Counts AS FLOAT))
  FROM (SELECT Count(*) AS P_Counts, S.MemberID, M.Major
        FROM STUDENT S
        LEFT JOIN AUTHORS A ON S.MemberID = A.MemberID
        JOIN MAJOR M ON M.MemberID = S.MemberID
        GROUP BY S.MemberID, M.Major) AS P
  GROUP BY P.Major
END;
GO

--Find the number of projects that were funded by a grant and were active during a given period of time
CREATE PROCEDURE Count_Grant_Projects_During_Interval (@GrantID INT, @Start_Date DATE, @End_Date DATE)
AS BEGIN
  SELECT Count(*)
  FROM FUNDS F
  JOIN PROJECTS P ON F.PID = P.PID
  WHERE @GrantID = F.GID AND @Start_Date < P.PEndDate AND @End_Date > P.PStartDate
END;
GO


--Find the three most prolific members who have worked on a project funded by a given grant.
CREATE PROCEDURE Get_Prolific_Members (@GrantID INT)
AS BEGIN
  SELECT TOP 3 M.FirstName, M.LastName
  FROM (SELECT DISTINCT L.MemberID, L.FirstName, L.LastName
        FROM LAB_MEMBER L
        JOIN WORKS_ON W ON W.MemberID = L.MemberID
        JOIN FUNDS F ON F.PID = W.PID
        WHERE @GrantID = F.GID) AS M
  JOIN AUTHORS A ON M.MemberID = A.MemberID
  GROUP BY M.MemberID, M.FirstName, M.LastName
  ORDER BY COUNT(PubID) DESC
END;
GO








