import React from 'react';
import './entrylookup.css'
import { data, useNavigate } from 'react-router-dom';

export function Entrylookup({email, selectedUser}) {
    const nav = useNavigate();

    const [firstName, updateFirstName] = React.useState("")
    const [middleName, updateMiddleName] = React.useState("")
    const [lastName, updateLastName] = React.useState("")

    const [newEmail, updateEmail] = React.useState("")
    const [newBirthday, updateBirthday] = React.useState("")
    const [newType, updateType] = React.useState("")

    const [infoMsg, updateInfoMsg] = React.useState("");

    useEffect(() => {
        if (selectedUser !== "") {
            user = getAccount()
            user.then((res) => {
                if (res) {
                    splitNames = res.name.split(" ");
                    updateFirstName(splitNames[0])
                    updateMiddleName(splitNames.length === 3 ? splitNames[1] : "")
                    updateLastName(splitNames.length === 3 ? splitNames[2] : splitNames[1])
                    updateEmail(res.email)
                    updateBirthday(res.birthday)
                    updateType(res.type)
                } 
            })
        } else {
            updateInfoMsg("Error: no customer selected")
        }
    }, [])

    function save() {
        const newName = (middleName === "") ? firstName + " " + lastName : firstName + " " + middleName + " " + lastName
        const fullDatabase = JSON.parse(localStorage.getItem("database"))

        if(
            getUser.name != newName ||
            getUser.email != newEmail ||
            getUser.birthday != newBirthday ||
            getUser.type != newType 
        ) {
            
            const updatedUser = {...getUser, name: newName, birthday: newBirthday, email: newEmail, type: newType, lastVisit: new Date().toLocaleDateString(), checkedOut: email}
            
            const newDatabase = [
                ...fullDatabase.slice(0, selectedUser),
                updatedUser,
                ...fullDatabase.slice(selectedUser+1)
            ]
            localStorage.setItem("database", JSON.stringify(newDatabase))
            updateDatabase(newDatabase)
            nav("/database")
        } else {
            noSave()
        }
        
    }

    function noSave() {
        const fullDatabase = JSON.parse(localStorage.getItem("database"))
        const updatedUser = {...getUser, checkedOut: "No"}
        const newDatabase = [
            ...fullDatabase.slice(0, selectedUser),
            updatedUser,
            ...fullDatabase.slice(selectedUser+1)
        ]
        localStorage.setItem("database", JSON.stringify(newDatabase))
        nav("/database")
    }

    async function getAccount() {
        const response = await fetch("/api/account", {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({uuid: selectedUser})
        });
    
        if (response.status === 200) {
            return await response.json();
        } else if (response.status === 401) {
            updateInfoMsg("Error: authorization is not valid");
            return null
        } else {
            updateInfoMsg("Error: failed to load account, status " + response.status);
            return null
        }
    }


  return (
            <main>
            <h1>Account Viwer</h1>

            <h2>Now Viewing {infoMsg}</h2>

                <div className="row">
                    <div className="col">
                        <label htmlFor="inputName">First Name</label>
                        <input type="text" className="form-control" id="inputName" defaultValue={firstName} onChange={(e) => updateFirstName(e.target.value)} placeholder="First Name" required />
                    </div>
                    <div className="col">
                        <label htmlFor="inputMiddleName">Middle Name</label>
                        <input type="text" className="form-control" id="inputMiddleName" defaultValue={middleName} onChange={(e) => updateMiddleName(e.target.value)} placeholder="Middle Name" />
                    </div>
                    <div className="col">
                        <label htmlFor="inputLastName">Last Name</label>
                        <input type="text" className="form-control" id="inputLastName" defaultValue={lastName} onChange={(e) => updateLastName(e.target.value)} placeholder="Last Name" required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="inputDOB">Date of Birth</label>
                        <input type="date" className="form-control" id="inputDOB" defaultValue={(getUser === "") ? "" : new Date(newBirthday).toISOString().split("T")[0]} onChange={(e) => updateBirthday(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" className="form-control" id="inputEmail" defaultValue={newEmail} onChange={(e) => updateEmail(e.target.value)} placeholder="Email" required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="memberType">Type</label>
                        <select name="type" id="memberType" className="form-control" defaultValue={newType} onChange={(e) => updateType(e.target.value)}>
                            <option value="Guest">Guest</option>
                            <option value="Member">Member</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="lastVisit">Last Visit</label>
                        <input className="form-control" type="text" id="lastVisit" readOnly value={getUser.lastVisit} />
                    </div>
                </div>

                {/* <div className="row">
                    <div className="col">
                        Notes:
                        <div className="notes-list">
                            <textarea className="form-control" name="note" id="note1" readOnly value="Likes to listen to music while climbing. -Sarah 08/24/2025"></textarea>
                            <textarea className="form-control" name="note" id="note2" readOnly value="Needs belay certification. -John 01/16/25"></textarea>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="new-note-form">Create New Note:</label>
                        <textarea className="form-control" name="note" id="new-note-form" placeholder="Type new note..."></textarea>
                    </div>
                    <div className="col">
                        <button type="button" id="submit-new-note" className="btn btn-warning" disabled={(getUser === "" || getUser.checkedOut != email) ? true : false}>Save Note</button>
                    </div>
                </div> */}

                <div className="row">
                    
                        <div className="submit-buttons">
                            <button type="submit" className="btn btn-info" onClick={save} disabled={(getUser === "" || getUser.checkedOut != email) ? true : false}>Save + Check In</button>
                        </div>
                    

                    
                        <div className="submit-buttons">
                            <button type="submit" className="btn btn-danger" onClick={noSave} disabled={(getUser === "" || getUser.checkedOut != email) ? true : false}>Exit + Check In</button>
                        </div>
                    
                </div>
        </main>
  );
}