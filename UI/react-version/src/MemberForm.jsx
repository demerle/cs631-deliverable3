import {useEffect, useState} from 'react'

export default function MemberForm(props) {

    const [memberType, setMemberType] = useState("Student");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [title, setTitle] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [academicLevel, setAcademicLevel] = useState("");
    const [major1, setMajor1] = useState("");
    const [major2, setMajor2] = useState("");
    const [major3, setMajor3] = useState("");
    const [numMajors, setNumMajors] = useState(1);
    const [institutionalAffil, setInstitutionalAffil] = useState("");
    const [biography, setBiography] = useState("");
    const [department, setDepartment] = useState("");




    function sendData(){

        alert("Query Submitted Successfully")
        window.location.reload()
    }



    return (
        <>
            <label>Member ID</label>
            <input type="text"/>
            <br/>
            {(props.action !== "delete" && props.action !== "read") &&
                <>
                    <label>Member First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <br/>
                    <label>Member Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    <br/>
                    <label>Member Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <br/>
                    <select
                        id="member-type"
                        value={memberType}
                        onChange={(e) => setMemberType(e.target.value)}
                    >
                        <option value={"Student"}>Student</option>
                        <option value={"External Collaborator"}>External Collaborator</option>
                        <option value={"Faculty"}>Faculty</option>
                    </select>

                    <br/>
                    {(memberType === "Student") &&
                        <>
                            <label>Student Number</label>
                            <input type="text" value={studentNumber}
                                   onChange={(e) => setStudentNumber(e.target.value)}/>
                            <br/>
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
                            <br/>
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
                            <br/>

                            <label>Major1</label>
                            <input type="text" value={major1} onChange={(e) => setMajor1(e.target.value)}/>

                            {numMajors > 1 && <>
                                <br/>
                                <label>Major2</label>
                                <input type="text" value={major2} onChange={(e) => setMajor2(e.target.value)}/>
                            </>
                            }

                            {numMajors > 2 && <>
                                <br/>
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
                            <br/>
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
                    <br/>
                    <button onClick={sendData}>Submit Query</button>
                </>
            }
        </>
    )
}