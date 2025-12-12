import { useState } from 'react'
import axios from "axios";
import {listToJSX} from "./utils.jsx"
export default function GrantForm(props) {

    // Whenever the API call is implemented. In the update method, whenever a ProjectID does not exist in the DB,
    // throw some error status in the backend and add functionality in here to report "Project not found"


    const [id, setId] = useState(-1);
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)


    async function sendData(){


        const json = {id, startDate, endDate};
        try{
            const res = await axios.post(`http://127.0.0.1:8000/${props.id}`, json);

            if (res) {
                alert("Query Submitted Successfully")
                if (props.action === "read")
                    console.log(res.data[0][""])
                    props.setJSX(listToJSX([{"Amount" : res.data[0][""]}]))
            }
        }
        catch (e){
            console.log(e)
        }

    }

    return (
        <>
            <label>Grant ID</label>
            <input type="text" value={id === -1 ? "" : id} onChange={(e) => setId(Number(e.target.value))}/>
            <br/><br/>
            {(props.id === 16) &&
            <>
                <label>Start Date</label>
                <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                <br/><br/>
                <label>End Date</label>
                <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                <br/><br/>
            </>
            }

            <button onClick={sendData}>Submit Query</button>
        </>
    )
}