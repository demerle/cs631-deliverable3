import { useState } from 'react'

export default function MemberForm(props) {

    const [memberType, setMemberType] = useState("Student");


    // Whenever the API call is implemented. In the update method, whenever a MemberID does not exist in the DB,
    // throw some error status in the backend and add functionality in here to report "Member not found"


    return (
        <>
            <label>Member ID</label>
            <input type="text"/>
            <br/>
            {(props.action !== "delete") &&
            <>
                <label>Member First Name</label>
                <input type="text"/>
                <br/>
                <label>Member Last Name</label>
                <input type="text"/>
                <br/>
                <label>Member title</label>
                <input type="text"/>
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
                        <input type="text"/>
                        <br/>
                        <label>Academic Level</label>
                        <input type="text"/>
                        <br/>
                        <label>Major</label>
                        <input type="text"/>
                    </>

                }

                {(memberType === "External Collaborator") &&
                    <>
                        <label>Institutional Affiliation</label>
                        <input type="text"/>
                        <br/>
                        <label>Biography</label>
                        <input type="text"/>

                    </>

                }

                {(memberType === "Faculty") &&
                    <>
                        <label>Department</label>
                        <input type="text"/>
                    </>

                }
            </>
            }
        </>
    )
}