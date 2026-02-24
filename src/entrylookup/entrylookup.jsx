import React from 'react';
import './entrylookup.css'

export function Entrylookup({databaseCustomers, updateDatabase, selectedUser, updateSelectedUser}) {
    const splitNames = selectedUser.name.split(" ");
    const [firstName, updateFirstName] = React.useState(splitNames[0])
    const [middleName, updateMiddleName] = React.useState(splitNames.length === 3 ? splitNames[1] : "")
    const [lastName, updateLastName] = React.useState(splitNames.length === 3 ? splitNames[2] : splitNames[1])
    console.log(new Date(selectedUser.birthday).toLocaleDateString())


  return (
            <main>
            <h1>Account Viwer</h1>

            <h2>Now Viewing Peter Quill</h2>

                <div className="row">
                    <div className="col">
                        <label htmlFor="inputName">First Name</label>
                        <input type="text" className="form-control" id="inputName" defaultValue={firstName} placeholder="First Name" required />
                    </div>
                    <div className="col">
                        <label htmlFor="inputMiddleName">Middle Name</label>
                        <input type="text" className="form-control" id="inputMiddleName" defaultValue={middleName} placeholder="Middle Name" />
                    </div>
                    <div className="col">
                        <label htmlFor="inputLastName">Last Name</label>
                        <input type="text" className="form-control" id="inputLastName" defaultValue={lastName} placeholder="Last Name" required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="inputDOB">Date of Birth</label>
                        <input type="date" className="form-control" id="inputDOB" defaultValue={new Date(selectedUser.birthday).toISOString().split("T")[0]} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" className="form-control" id="inputEmail" defaultValue={selectedUser.email} placeholder="Email" required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="memberType">Type</label>
                        <select name="type" id="memberType" className="form-control" defaultValue={selectedUser.type}>
                            <option value="Guest">Guest</option>
                            <option value="Member">Member</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="lastVisit">Last Visit</label>
                        <input className="form-control" type="date" id="lastVisit" readOnly value={selectedUser.lastVisit} />
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
                        <button type="button" id="submit-new-note" className="btn btn-warning">Save Note</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="submit-buttons">
                            <button type="submit" className="btn btn-info">Save and Check In</button>
                        </div>
                    </div>

                    <div className="col">
                        <div className="submit-buttons">
                            <button type="submit" className="btn btn-danger">Exit and Check In</button>
                        </div>
                    </div>
                </div>
        </main>
  );
}