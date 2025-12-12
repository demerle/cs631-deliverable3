import { useState } from 'react'
import axios from "axios";
import {listToJSX} from "./utils.jsx";

export default function EquipmentForm(props) {

    // Whenever the API call is implemented. In the update method, whenever a EquipmentID does not exist in the DB,
    // throw some error status in the backend and add functionality in here to report "Equipment not found"

    const [id, setId] = useState(-1)
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [purchaseDate, setPurchaseDate] = useState(null)
    const [status, setStatus] = useState('')

    async function sendData(){

        const json = {id, name, type, purchaseDate, status};

        const res = await axios.post(`http://127.0.0.1:8000/${props.id}`, json);

        try {


            if (res) {
                alert("Query Submitted Successfully")
                if (props.action === "read")
                    props.setJSX(listToJSX(res.data))
            }
        }
        catch (e){
            if (props.action === "read" || props.action === "update" || props.action === "delete") {
                alert("Equipment not found")
            }
            else{
                alert("Error creating Equipment")
            }
        }
    }

    return (
        <>
            {props.action !== "create" && props.action !== "read" &&
            <>
                <label>Equipment ID</label>
                <input type="text" value={id === -1 ? "" : id} onChange={(e) => setId(Number(e.target.value))}/>
                <br/><br/>
            </>
            }
            {(props.action !== "delete") &&
                <>
                    <label>Equipment Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    <br/><br/>
                    {props.action !== "read" &&
                    <>
                        <label>Equipment Type</label>
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)}/>
                        <br/><br/>
                        <label>Purchase Date</label>
                        <input type="datetime-local" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)}/>
                        <br/><br/>
                        <label>Equipment Status</label>
                        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>
                        <br/><br/>
                    </>}
                </>
            }
            <br/><br/>
            <button onClick={sendData}>Submit Query</button>
        </>
    )
}