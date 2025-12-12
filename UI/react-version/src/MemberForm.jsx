import {useEffect, useState} from 'react'
import axios from "axios";
import {listToJSX} from "./utils.jsx";
export default function MemberForm(props) {


    const [id, setId] = useState(-1);
    const [memberType, setMemberType] = useState("Student");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [joinDate, setJoinDate] = useState(null);
    const [studentNumber, setStudentNumber] = useState(-1);
    const [academicLevel, setAcademicLevel] = useState("");
    const [major1, setMajor1] = useState("");
    const [major2, setMajor2] = useState("");
    const [major3, setMajor3] = useState("");
    const [numMajors, setNumMajors] = useState(1);
    const [institutionalAffil, setInstitutionalAffil] = useState("");
    const [biography, setBiography] = useState("");
    const [department, setDepartment] = useState("");




    async function sendData(){

        const json = {id, memberType, firstName, lastName, joinDate, studentNumber, academicLevel, major1, major2, major3, numMajors, institutionalAffil, biography, department};
        console.log("here1")
        const res = await axios.post(`http://127.0.0.1:8000/${props.id}`, json);
        console.log("here2")
        if (res) {
            alert("Query Submitted Successfully")
            if (props.action === "read")
                props.setJSX(listToJSX(res.data))
        }

    }


    return (
        <>
            {props.action !== "create" && props.action !== "read" &&
                <>
                    <label>Member ID</label>
                    <input type="text" value={id === -1 ? "" : id} onChange={(e) => setId(Number(e.target.value))}/>
                    <br/><br/>
                </>
            }
            {(props.action !== "delete") &&
                <>
                    <label>Member First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <br/><br/>
                    <label>Member Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    <br/><br/>
                    {props.action !== "read" &&
                    <>
                        <label>Member Join Date</label>
                        <input type="datetime-local" value={joinDate} onChange={(e) => setJoinDate(e.target.value)}/>
                        <br/><br/>
                        <select
                            id="member-type"
                            value={memberType}
                            onChange={(e) => setMemberType(e.target.value)}
                        >
                            <option value={"Student"}>Student</option>
                            <option value={"External Collaborator"}>External Collaborator</option>
                            <option value={"Faculty"}>Faculty</option>
                        </select>

                    <br/><br/>

                    {(memberType === "Student") &&
                        <>
                            {props.action !== "create" &&
                                <>
                                    <label>Student Number</label>
                                    <input type="text" value={studentNumber === -1 ? "" : studentNumber}
                                           onChange={(e) => setStudentNumber(Number(e.target.value))}/>
                                    <br/><br/>
                                </>}
                            <label>Academic Level</label>
                            <select
                                id="academic-level"
                                value={academicLevel}
                                onChange={(e) => setAcademicLevel(e.target.value)}
                            >
                                <option value={"freshman"}>Freshman</option>
                                <option value={"sophomore"}>Sophomore</option>
                                <option value={"junior"}>Junior</option>
                                <option value={"senior"}>Senior</option>
                            </select>
                            <br/><br/>
                            <label>Enter amount of majors</label>
                            <select
                                id="num-majors"
                                value={numMajors}
                                onChange={(e) => setNumMajors(Number(e.target.value))}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                            </select>
                            <br/><br/>

                            <label>Major1</label>
                            <input type="text" value={major1} onChange={(e) => setMajor1(e.target.value)}/>

                            {numMajors > 1 && <>
                                <br/><br/>
                                <label>Major2</label>
                                <input type="text" value={major2} onChange={(e) => setMajor2(e.target.value)}/>
                            </>
                            }

                            {numMajors > 2 && <>
                                <br/><br/>
                                <label>Major3</label>
                                <input type="text" value={major3} onChange={(e) => setMajor3(e.target.value)}/>
                            </>
                            }
                        </>
                    }

                    {(memberType === "External Collaborator") &&
                        <>
                            <label>Institutional Affiliation</label>
                            <input type="text" value={institutionalAffil}
                                   onChange={(e) => setInstitutionalAffil(e.target.value)}/>
                            <br/><br/>
                            <label>Biography</label>
                            <input type="text" value={biography} onChange={(e) => setBiography(e.target.value)}/>
                        </>
                    }

                    {(memberType === "Faculty") &&
                        <>
                            <label>Department</label>
                            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)}/>
                        </>
                    }
                    </>}
                </>
            }
            <br/><br/>
            <button onClick={sendData}>Submit Query</button>
        </>
    )
}