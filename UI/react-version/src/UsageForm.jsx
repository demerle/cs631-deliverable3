import { useState } from 'react'
import axios from "axios";
import {listToJSX} from "./utils.jsx"
export default function UsageForm(props) {



    const [equip_id, set_equip_id] = useState(-1);
    const [member_id, set_member_id] = useState(-1);
    const [start_date, set_start_date] = useState(null);
    const [end_date, set_end_date] = useState(null);
    const [purpose, setPurpose] = useState("")

    async function sendData(){


        const json = {equip_id, member_id, start_date, end_date, purpose};
        try{
            const res = await axios.post(`http://127.0.0.1:8000/${props.id}`, json);

            if (res) {
                alert("Query Submitted Successfully")
                props.setJSX(listToJSX(res.data))
            }
        }
        catch (e){
            console.log(e)
        }

    }

    return (
        <>
            <label>Equipment ID</label>
            <input type="text" value={equip_id === -1 ? "" : equip_id} onChange={(e) => set_equip_id(Number(e.target.value))}/>
            <br/><br/>
            <label>Member ID</label>
            <input type="text" value={member_id === -1 ? "" : member_id} onChange={(e) => set_member_id(Number(e.target.value))}/>
            <br/><br/>
            {(props.action !== "delete" && props.action !== "read") &&
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