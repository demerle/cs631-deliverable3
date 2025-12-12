import { useState } from 'react'
import axios from "axios";
import {listToJSX} from "./utils.jsx";

export default function ProjectForm(props) {

    // Whenever the API call is implemented. In the update method, whenever a ProjectID does not exist in the DB,
    // throw some error status in the backend and add functionality in here to report "Project not found"

    const [id, setId] = useState(-1)
    const [title, setTitle] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [duration, setDuration] = useState('')
    const [status, setStatus] = useState('')
    const [fac_id, setFac_id] = useState(-1)


    async function sendData() {

        const json = {id, title, startDate, endDate, duration, status, fac_id};
        console.log("JSON being sent:", json);


        try {
            const res = await axios.post(`http://127.0.0.1:8000/${props.id}`, json);

            if (res) {
                alert("Query Submitted Successfully")
                console.log(res);
                if (props.action === "read")
                    props.setJSX(listToJSX(res.data))
            }

        }
        catch(e) {
            if (e.status === 404) {
                alert("Faculty ID Not Found")
            } else {
                console.log("API error:", e)
            }

        }




    }



    return (
        <>
            {props.action !== "create" && props.action !== "read" &&
            <>
                <label>Project ID</label>
                <input type="text" value={id === -1 ? "" : id} onChange={(e) => setId(Number(e.target.value))}/>
                <br/><br/>
            </>}
            {(props.action !== "delete") &&
                <>

                    <label>Project Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <br/><br/>
                    {props.action !== "read" &&
                    <>
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
                        <input type="text" value={fac_id === -1 ? "" : fac_id} onChange={(e) => setFac_id(Number(e.target.value))}/>
                    </>}
                </>
            }
            <br/><br/>
            <button onClick={sendData}>Submit Query</button>
        </>
    )
}