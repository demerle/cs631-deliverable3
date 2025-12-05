import { useState } from 'react'

export default function GrantForm(props) {

    // Whenever the API call is implemented. In the update method, whenever a ProjectID does not exist in the DB,
    // throw some error status in the backend and add functionality in here to report "Project not found"


    const [id, setID] = useState("");



    function sendData(){

        alert("Query Submitted Successfully")
        window.location.reload()
    }

    return (
        <>
            <label>Grant ID</label>
            <input type="text" value={id} onChange={(e) => setID(e.target.value)}/>
            <br/>
            <button onClick={sendData}>Submit Query</button>
        </>
    )
}