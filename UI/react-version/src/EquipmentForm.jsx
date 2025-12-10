import { useState } from 'react'

export default function EquipmentForm(props) {

    // Whenever the API call is implemented. In the update method, whenever a EquipmentID does not exist in the DB,
    // throw some error status in the backend and add functionality in here to report "Equipment not found"

    const [id, setId] = useState(-1)
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [purchaseDate, setPurchaseDate] = useState('')
    const [status, setStatus] = useState('')

    function sendData(){

        alert("Query Submitted Successfully")
        window.location.reload()
    }

    return (
        <>
            <label>Equipment ID</label>
            <input type="text" value={id === -1 ? "" : id} onChange={(e) => setId(Number(e.target.value))}/>
            <br/><br/>
            {(props.action !== "delete" && props.action !== "read") &&
                <>
                    <label>Equipment Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    <br/><br/>
                    <label>Equipment Type</label>
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)}/>
                    <br/><br/>
                    <label>Purchase Date</label>
                    <input type="datetime-local" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)}/>
                    <br/><br/>
                    <label>Equipment Status</label>
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>
                    <br/><br/>
                </>
            }
            <br/><br/>
            <button onClick={sendData}>Submit Query</button>
        </>
    )
}