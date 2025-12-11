import { useState } from 'react'

export default function GrantForm(props) {

    // Whenever the API call is implemented. In the update method, whenever a ProjectID does not exist in the DB,
    // throw some error status in the backend and add functionality in here to report "Project not found"


    const [id, setId] = useState(-1);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')


    function sendData(){

        alert("Query Submitted Successfully")
        window.location.reload()
    }

    return (
        <>
            <label>Grant ID</label>
            <input type="text" value={id === -1 ? "" : id} onChange={(e) => setId(Number(e.target.value))}/>
            <br/><br/>

            <label>Start Date</label>
            <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
            <br/><br/>
            <label>End Date</label>
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
            <br/><br/>

            <button onClick={sendData}>Submit Query</button>
        </>
    )
}