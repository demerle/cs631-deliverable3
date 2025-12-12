import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MemberForm from "./MemberForm.jsx";
import ProjectForm from "./ProjectForm.jsx";
import EquipmentForm from "./EquipmentForm.jsx";
import GrantForm from "./GrantForm.jsx";
import NoParamsForm from "./NoParamsForm.jsx";
import UsageForm from "./UsageForm.jsx";



function App() {

    const [JSX, setJSX] = useState(<h1>Default value</h1>)
    const [querySelected, setQuerySelected] = useState(false)
    const [select, setSelect] = useState(21)

    function submit(){
        setQuerySelected(!querySelected)
        switch (select) {
            case (21):
                setJSX(<MemberForm action={"read"} id = {21} setJSX={setJSX}/>)
                break;
            case (1):
                setJSX(<MemberForm action={"create"} id = {1} setJSX={setJSX}/>)
                break;
            case (2):
                setJSX(<MemberForm action={"update"} id = {2} setJSX={setJSX}/>)
                break;
            case (3):
                setJSX(<MemberForm action={"delete"} id = {3} setJSX={setJSX}/>)
                break;
            case (4):
                setJSX(<GrantForm action={"read"} id = {4} setJSX={setJSX}/>)
                break;
            case (5):
                setJSX(<NoParamsForm action={"read"} id = {5} setJSX={setJSX}/>)
                break;
            case (22):
                setJSX(<ProjectForm action={"read"} id = {22} setJSX={setJSX}/>)
                break;
            case (6):
                setJSX(<ProjectForm action={"create"} id = {6} setJSX={setJSX}/>)
                break;
            case (7):
                setJSX(<ProjectForm action={"update"} id = {7} setJSX={setJSX}/>)
                break;
            case (8):
                setJSX(<ProjectForm action={"delete"} id = {8} setJSX={setJSX}/>)
                break;
            case (9):
                setJSX(<ProjectForm action={"read"} id = {9} setJSX={setJSX}/>)
                break;
            case (23):
                setJSX(<EquipmentForm action={"read"} id = {23} setJSX={setJSX}/>)
                break;
            case (10):
                setJSX(<EquipmentForm action={"create"} id = {10} setJSX={setJSX}/>)
                break;
            case (11):
                setJSX(<EquipmentForm action={"update"} id = {11} setJSX={setJSX}/>)
                break;
            case (12):
                setJSX(<EquipmentForm action={"delete"} id = {12} setJSX={setJSX}/>)
                break;
            case (13):
                setJSX(<EquipmentForm action={"read"} id = {13} setJSX={setJSX}/>)
                break;
            case (14):
                setJSX(<NoParamsForm action={"read"} id = {14} setJSX={setJSX}/>)
                break;
            case (15):
                setJSX(<NoParamsForm action={"read"} id = {15} setJSX={setJSX}/>)
                break;
            case (16):
                setJSX(<GrantForm action={"read"} id = {16} setJSX={setJSX}/>)
                break;
            case (17):
                setJSX(<GrantForm action={"read"} id = {17} setJSX={setJSX}/>)
                break;
            case (18):
                setJSX(<GrantForm action={"read"} id = {18} setJSX={setJSX}/>)
                break;
            case (19):
                setJSX(<NoParamsForm action={"read"} id = {19} setJSX={setJSX}/>)
                break;
            case (20):
                setJSX(<EquipmentForm action={"read"} id = {20} setJSX={setJSX}/>)
                break;
            case (24):
                setJSX(<UsageForm action={"read"} id = {24} setJSX={setJSX}/>)
                break;
            case (25):
                setJSX(<UsageForm action={"create"} id = {25} setJSX={setJSX}/>)
                break;
            case (26):
                setJSX(<UsageForm action={"update"} id = {26} setJSX={setJSX}/>)
                break;
            case (27):
                setJSX(<UsageForm action={"delete"} id = {27} setJSX={setJSX}/>)
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
                      <option value={21}>Get Member</option>
                      <option value={1}>Add Member</option>
                      <option value={2}>Update Member</option>
                      <option value={3}>Remove Member</option>

                      {/*<option value={4}>Show members who have worked on projects funded by a given grant</option>
                      <option value={5}>Show mentorship relations among members who have worked on the same project</option>*/}
                      <option value={22}>Get Project</option>
                      <option value={6}>Add Project</option>
                      <option value={7}>Update Project</option>
                      <option value={8}>Remove Project</option>
                      <option value={9}>Display Project Status</option>

                      <option value={23}>Get Equipment</option>
                      <option value={10}>Add Equipment</option>
                      <option value={11}>Update Equipment</option>
                      <option value={12}>Remove Equipment</option>
                      <option value={13}>Display Equipment Status</option>

                      <option value={24}>Get Equipment Usage</option>
                      <option value={25}>Add Equipment Usage</option>
                      <option value={26}>Update Equipment Usage</option>
                      <option value={27}>Delete Equipment Usage</option>

                      <option value={14}>Identify the name of the member(s) with the highest number of publications
                      </option>
                      <option value={15}>Calculate the average number of student publications per major</option>
                      <option value={16}>Find the number of projects that were funded by a grant and were
                          active during a given period of time
                      </option>
                      <option value={17}>Find the three most prolific members who have worked on a project funded
                          by a given grant
                      </option>

                      <option value={18}>Show members who have worked on projects funded by a given grant</option>
                      <option value={19}>Show mentorship relations among members who have worked on the same project
                      </option>
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
