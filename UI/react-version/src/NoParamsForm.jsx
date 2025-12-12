import axios from "axios";
import {listToJSX} from "./utils.jsx"
import {useEffect} from "react";
export default function NoParamsForm(props) {



    useEffect(() => {



        axios.post(`http://127.0.0.1:8000/${props.id}`)
            .then((res) => {
            alert("Query Submitted Successfully")
            props.setJSX(listToJSX(res.data))
        }).catch(err => {
            console.error("Error:", err);
        })

    },[]);


}