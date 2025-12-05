import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MemberForm from "./MemberForm.jsx";
import ProjectForm from "./ProjectForm.jsx";
import EquipmentForm from "./EquipmentForm.jsx";
import GrantForm from "./GrantForm.jsx";



function App() {

    const [JSX, setJSX] = useState(<h1>Default value</h1>)
    const [querySelected, setQuerySelected] = useState(false)
    const [select, setSelect] = useState(1)

    function submit(){
        setQuerySelected(!querySelected)
        switch (select) {
            case (1):
                setJSX(<MemberForm action={"create"}/>)
                break;
            case (2):
                setJSX(<MemberForm action={"update"}/>)
                break;
            case (3):
                setJSX(<MemberForm action={"delete"}/>)
                break;
            case (4):
                setJSX(<GrantForm action={"read"}/>)
                break;
            case (5):
                setJSX(<ProjectForm action={"read"}/>)
                break;
            case (6):
                setJSX(<ProjectForm action={"create"}/>)
                break;
            case (7):
                setJSX(<ProjectForm action={"update"}/>)
                break;
            case (8):
                setJSX(<ProjectForm action={"delete"}/>)
                break;
            case (9):
                setJSX(<ProjectForm action={"read"}/>)
                break;
            case (10):
                setJSX(<EquipmentForm action={"create"}/>)
                break;
            case (11):
                setJSX(<EquipmentForm action={"update"}/>)
                break;
            case (12):
                setJSX(<EquipmentForm action={"delete"}/>)
                break;
            case (13):
                setJSX(<EquipmentForm action={"read"}/>)
                break;
            case (14):
                setJSX(<MemberForm action={"read"}/>)
                break;
            case (15):
                setJSX(<h1>Calculated Result: idk</h1>)
                break;
            case (16):
                setJSX(<GrantForm action={"read"}/>)
                break;
            case (17):
                setJSX(<GrantForm action={"read"}/>)
                break;
            case (18):
                setJSX(<GrantForm action={"read"}/>)
                break;
            case (19):
                setJSX(<ProjectForm action={"read"}/>)
                break;
            case (20):
                setJSX(<EquipmentForm action={"read"}/>)
                break;

        }
    }


    return (

      <>
      {!querySelected ?
          <>
              <h1>CS631 Project Deliverable 3</h1>
              <br/>
              <h2>Select a Query to either obtain data information or perform an action on the database</h2>
              <h3>Only select a single query please</h3>
              <form id="form" onSubmit={e => e.preventDefault()}>
                  <select value={select} id={"select"} onChange={(e) => setSelect(Number(e.target.value))}>
                      <option value={1}>Add Member</option>
                      <option value={2}>Update Member</option>
                      <option value={3}>Remove Member</option>

                      <option value={4}>Show members who have worked on projects funded by a given grant</option>
                      <option value={5}>Show mentorship relations among members who have worked on the same project</option>

                      <option value={6}>Add Project</option>
                      <option value={7}>Update Project</option>
                      <option value={8}>Remove Project</option>
                      <option value={9}>Display Project Status</option>

                      <option value={10}>Add Equipment</option>
                      <option value={11}>Update Equipment</option>
                      <option value={12}>Remove Equipment</option>
                      <option value={13}>Display Equipment Status</option>

                      <option value={14}>Identify the name of the member(s) with the highest number of publications</option>
                      <option value={15}>Calculate the average number of student publications per major</option>
                      <option value={16}>Find the number of projects that were funded by a grant and were
                          active during a given period of time
                      </option>
                      <option value={17}>Find the three most prolific members who have worked on a project funded
                          by a given grant
                      </option>

                      <option value={18}>Show members who have worked on projects funded by a given grant</option>
                      <option value={19}>Show mentorship relations among members who have worked on the same project</option>
                      <option value={20}>Show members currently using a given piece of equipment and the projects
                          they are working on
                      </option>
                  </select>

                  <br/>
                  <button onClick={submit}>Continue with Query</button>
              </form>
          </> :
          <>
              {JSX}
          </>

      }
      </>
  )
}

export default App
