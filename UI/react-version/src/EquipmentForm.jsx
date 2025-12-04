import { useState } from 'react'

export default function EquipmentForm(props) {

    // Whenever the API call is implemented. In the update method, whenever a EquipmentID does not exist in the DB,
    // throw some error status in the backend and add functionality in here to report "Equipment not found"


    return (
        <>
            <label>Equipment ID</label>
            <input type="text"/>
            <br/>
            {(props.action !== "delete" && props.action !== "read") &&
                <>
                    <label>Equipment Name</label>
                    <input type="text"/>
                    <br/>
                    <label>Equipment Type</label>
                    <input type="text"/>
                    <br/>
                    <label>Purchase Date</label>
                    <input type="datetime"/>
                    <br/>
                    <label>Equipment Status</label>
                    <input type="text"/>
                    <br/>
                </>
            }
        </>
    )
}