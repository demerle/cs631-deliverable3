import { useState } from 'react'
import axios from "axios";
import {listToJSX} from "./utils.jsx"
export default function UsageForm(props) {



    const [equip_id, set_equip_id] = useState(-1);
    const [member_id, setMember_id] = useState(-1);
    const [start_date, set_start_date] = useState(null);
    const [end_date, set_end_date] = useState(null);
    const [purpose, setPurpose] = useState("")

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
            <label>Equipment ID</label>
            <input type="text" value={id === -1 ? "" : id} onChange={(e) => setId(Number(e.target.value))}/>
            <br/><br/>
            <label>Member ID</label>
            <input type="text" value={id === -1 ? "" : id} onChange={(e) => setId(Number(e.target.value))}/>
            <br/><br/>
            {(props.action !== "read") &&
                <>
                    <label>Start Date</label>
                    <input type="datetime-local" value={start_date} onChange={(e) => set_start_date(e.target.value)}/>
                    <br/><br/>
                    <label>End Date</label>
                    <input type="datetime-local" value={endDate} onChange={(e) => set_end_date(e.target.value)}/>
                    <br/><br/>
                    <label>Purpose of Use</label>
                    <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)}/>
                    <br/><br/>
                </>
            }
            <button onClick={sendData}>Submit Query</button>
        </>
    )
}