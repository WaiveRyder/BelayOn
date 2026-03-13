import React, { useEffect } from 'react';
import './entrylookup.css'
import { data, useNavigate } from 'react-router-dom';

export function Entrylookup({selectedUser, updateSelectedUser}) {
    const nav = useNavigate();

    const [firstName, updateFirstName] = React.useState("")
    const [middleName, updateMiddleName] = React.useState("")
    const [lastName, updateLastName] = React.useState("")

    const [email, updateEmail] = React.useState("")
    const [birthday, updateBirthday] = React.useState("")
    const [type, updateType] = React.useState("")
    const [lastVisit, updateLastVisit] = React.useState("")

    const [infoMsg, updateInfoMsg] = React.useState("");

    useEffect(() => {
        if (selectedUser !== "") {
            let user = getAccount()
            user.then((res) => {
                if (res) {
                    const splitNames = res.name.split(" ");
                    updateFirstName(splitNames[0])
                    updateMiddleName(splitNames.length === 3 ? splitNames[1] : "")
                    updateLastName(splitNames.length === 3 ? splitNames[2] : splitNames[1])

                    updateEmail(res.email)
                    updateBirthday(res.birthday)
                    updateType(res.type)
                    updateLastVisit(res.lastVisit)
                } else {
                    updateSelectedUser("")
                    updateInfoMsg("Error: account doesn't exist")
                }
            })
        } else {
            updateInfoMsg("Error: no customer selected")
        }
    }, [])

    async function save() {
        const response = await fetch("/api/save", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: (middleName === "") ? firstName + " " + lastName : firstName + " " + middleName + " " + lastName,
                birthday: birthday,
                email: email,
                type: type,
                lastVisit: lastVisit,
                uuid: selectedUser
            })
        });

        if (response.status === 200) {
            nav("/database")
        } else if (response.status === 401) {
            updateInfoMsg("Error: authorization is not valid");
        } else if (response.status === 402) {
            response.json().then(updateInfoMsg)
        } else {
            updateInfoMsg("Error: failed to save account, status " + response.status);
        }
    }

    async function noSave() {
        const response = await fetch("/api/checkin", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({uuid: selectedUser})
        })

        if (response.status === 200) {
            nav("/database")
        } else if (response.status === 401) {
            updateInfoMsg("Error: authorization is not valid");
        } else if (response.status === 402) {
            response.json().then(updateInfoMsg);
        } else {
            updateInfoMsg("Error: failed to check in account, status " + response.status);
        }
    }

    async function getAccount() {
        const response = await fetch("/api/account/" + selectedUser, {method: "GET"});
    
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
                        <input type="date" className="form-control" id="inputDOB" defaultValue={(birthday === "") ? "" : new Date(birthday).toISOString().split("T")[0]} onChange={(e) => updateBirthday(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" className="form-control" id="inputEmail" defaultValue={email} onChange={(e) => updateEmail(e.target.value)} placeholder="Email" required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="memberType">Type</label>
                        <select name="type" id="memberType" className="form-control" value={type} onChange={(e) => updateType(e.target.value)}>
                            <option value="Guest">Guest</option>
                            <option value="Member">Member</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="lastVisit">Last Visit</label>
                        <input className="form-control" type="text" id="lastVisit" readOnly value={lastVisit} />
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
                            <button type="submit" className="btn btn-info" onClick={save} disabled={(selectedUser === "")}>Save + Check In</button>
                        </div>
                    

                    
                        <div className="submit-buttons">
                            <button type="submit" className="btn btn-danger" onClick={noSave} disabled={(selectedUser === "")}>Exit + Check In</button>
                        </div>
                    
                </div>
        </main>
  );
}