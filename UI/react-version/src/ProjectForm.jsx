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

    function sendData(){

        alert("Query Submitted Successfully")
        window.location.reload()
    }
    return (
        <>
            <label>Project ID</label>
            <input type="text" value={id} onChange={(e) => setId(Number(e.target.value))}/>
            <br/>
            {(props.action !== "delete" && props.action !== "read") &&
                <>
                    <label>Project title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <br/>
                    <label>Project Start Date</label>
                    <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                    <br/>
                    <label>Project End Date</label>
                    <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                    <br/>
                    <label>Project Expected Duration</label>
                    <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}/>
                    <br/>
                    <label>Project Status</label>
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>
                </>
            }
            <br/>
            <button onClick={sendData}>Submit Query</button>
        </>
    )
}