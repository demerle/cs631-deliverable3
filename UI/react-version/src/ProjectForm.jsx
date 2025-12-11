import { useState } from 'react'

export default function ProjectForm(props) {

    // Whenever the API call is implemented. In the update method, whenever a ProjectID does not exist in the DB,
    // throw some error status in the backend and add functionality in here to report "Project not found"

    const [id, setId] = useState(-1)
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [duration, setDuration] = useState('')
    const [status, setStatus] = useState('')
    const [facultyId, setFacultyId] = useState(-1)
    function sendData(){

        alert("Query Submitted Successfully")

    }
    return (
        <>
            <label>Project ID</label>
            <input type="text" value={id === -1 ? "" : id} onChange={(e) => setId(Number(e.target.value))}/>
            <br/><br/>
            {(props.action !== "delete" && props.action !== "read") &&
                <>
                    <label>Project title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <br/><br/>
                    <label>Project Start Date</label>
                    <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                    <br/><br/>
                    <label>Project End Date</label>
                    <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                    <br/><br/>
                    <label>Project Expected Duration</label>
                    <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}/>
                    <br/><br/>
                    <label>Project Status</label>
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>
                    <br/><br/>
                    <label>Faculty ID</label>
                    <input type="text" value={facultyId === -1 ? "" : facultyId} onChange={(e) => setFacultyId(Number(e.target.value))}/>
                </>
            }
            <br/><br/>
            <button onClick={sendData}>Submit Query</button>
        </>
    )
}