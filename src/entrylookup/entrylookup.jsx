import React from 'react';
import './entrylookup.css'
import { data, useNavigate } from 'react-router-dom';

export function Entrylookup({databaseCustomers, updateDatabase, selectedUser, updateSelectedUser}) {
    const nav = useNavigate();
    const index = databaseCustomers.indexOf(selectedUser)

    const splitNames = selectedUser === "" ? "" : selectedUser.name.split(" ");
    const [firstName, updateFirstName] = React.useState(splitNames[0])
    const [middleName, updateMiddleName] = React.useState(splitNames.length === 3 ? splitNames[1] : "")
    const [lastName, updateLastName] = React.useState(splitNames.length === 3 ? splitNames[2] : splitNames[1])

    const [newEmail, updateEmail] = (selectedUser === "") ? "" : React.useState(selectedUser.email)
    const [newBirthday, updateBirthday] = (selectedUser === "") ? "" : React.useState(selectedUser.birthday)
    const [newType, updateType] = (selectedUser === "") ? "" : React.useState(selectedUser.type)

    const [changesMade, updateChangesMade] = React.useState(true)

    function save() {
        const newName = (middleName === "") ? firstName + " " + lastName : firstName + " " + middleName + " " + lastName

        if(
            selectedUser.name != newName ||
            selectedUser.email != newEmail ||
            selectedUser.birthday != newBirthday ||
            selectedUser.type != newType 
        ) {
            
            const updatedUser = {...selectedUser, name: newName, birthday: newBirthday, email: newEmail, type: newType, lastVisit: new Date().toLocaleDateString(), checkedOut: "No"}
            
            const newDatabase = [
                ...databaseCustomers.slice(0, index),
                updatedUser,
                ...databaseCustomers.slice(index+1)
            ]
            updateDatabase(newDatabase)
            updateSelectedUser(updatedUser)
            localStorage.setItem("database", JSON.stringify(newDatabase))
            nav("/database")
        } else {
            noSave()
        }
        
    }

    function noSave() {
        const updatedUser = {...selectedUser, checkedOut: "No"}
        updateSelectedUser(updatedUser)
        const newDatabase = [
            ...databaseCustomers.slice(0, index),
            updatedUser,
            ...databaseCustomers.slice(index+1)
        ]
        updateDatabase(newDatabase)
        nav("/database")
    }


  return (
            <main>
            <h1>Account Viwer</h1>

            <h2>Now Viewing {(selectedUser === "") ? "ERROR: NO CUSTOMER SELECTED" : firstName}</h2>

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
                        <input type="date" className="form-control" id="inputDOB" defaultValue={(selectedUser === "") ? "" : new Date(newBirthday).toISOString().split("T")[0]} onChange={(e) => updateBirthday(e.target.value)} required />
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
                        <input className="form-control" type="text" id="lastVisit" readOnly value={selectedUser.lastVisit} />
                    </div>
                </div>

                <div className="row">
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
                        <button type="button" id="submit-new-note" className="btn btn-warning" disabled={(selectedUser === "") ? true : false}>Save Note</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="submit-buttons">
                            <button type="submit" className="btn btn-info" onClick={save} disabled={(selectedUser === "") ? true : false}>Save and Check In</button>
                        </div>
                    </div>

                    <div className="col">
                        <div className="submit-buttons">
                            <button type="submit" className="btn btn-danger" onClick={noSave} disabled={(selectedUser === "") ? true : false}>Exit and Check In</button>
                        </div>
                    </div>
                </div>
        </main>
  );
}