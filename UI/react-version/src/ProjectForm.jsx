import { useState } from 'react'

export default function ProjectForm(props) {

    // Whenever the API call is implemented. In the update method, whenever a ProjectID does not exist in the DB,
    // throw some error status in the backend and add functionality in here to report "Project not found"


    return (
        <>
            <label>Project ID</label>
            <input type="text"/>
            <br/>
            {(props.action !== "delete" && props.action !== "read") &&
                <>
                    <label>Project title</label>
                    <input type="text"/>
                    <br/>
                    <label>Project Start Date</label>
                    <input type="datetime"/>
                    <br/>
                    <label>Project End Date</label>
                    <input type="datetime"/>
                    <br/>
                    <label>Project Expected Duration</label>
                    <input type="text"/>
                    <br/>
                    <label>Project Status</label>
                    <input type="text"/>
                </>
            }
        </>
    )
}