import React from 'react';
import './database.css';
import { useNavigate } from 'react-router-dom';

export function Database({email, databaseCustomers, updateDatabase, selectedUser, updateSelectedUser}) {
    const [inUseMsg, updateUseMsg] = React.useState("")
    const nav = useNavigate()

    function checkSelection() {
        const index = databaseCustomers.indexOf(selectedUser)

        if(selectedUser.checkedOut === "No") {
            const newUser = {...selectedUser, checkedOut: email}
            updateSelectedUser(newUser)
            const newDatabase = [
                ...databaseCustomers.slice(0, index),
                newUser,
                ...databaseCustomers.slice(index+1)
            ]
            updateDatabase(newDatabase)
            nav("/entrylookup")
        } else {
            updateUseMsg("This account is already in use by " + selectedUser.checkedOut)
        }
    }

  return (
          <main>
            <h1>Database</h1>

            <p>Logged in as: User. All edits will be logged under this name.</p>
            <p>Selected User: {selectedUser.name}</p>

            <form id="search" method="get">
                <input type="search" className="form-control" id="search-box" required placeholder="Name or Email" />
                <button type="button" className="btn btn-info" id="search-button">Search🔎</button>
            </form>

            <br />

            <table className="table">
                <caption>
                    List of accounts that match search criteria.
                    <form id="new-account-form" action="createaccount">
                        <button id="new-account-button">+</button>
                    </form>
                </caption>
                <thead>
                    <tr>
                        <th id="top-left" scope="col">Name</th>
                        <th scope="col">Birthday</th>
                        <th scope="col">Email</th>
                        <th scope="col">Type</th>
                        <th scope="col">Last Visit</th>
                        <th id="top-right" scope="col">Checked Out</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        databaseCustomers.map((row, idx) => {
                            return <tr key={idx}>
                                <td><button className="open-button" onClick={() => updateSelectedUser(row)}>{row.name}</button></td>
                                <td><button className="middle-button" onClick={() => updateSelectedUser(row)}>{row.birthday}</button></td>
                                <td><button className="middle-button" onClick={() => updateSelectedUser(row)}>{row.email}</button></td>
                                <td><button className="middle-button" onClick={() => updateSelectedUser(row)}>{row.type}</button></td>
                                <td><button className="middle-button" onClick={() => updateSelectedUser(row)}>{row.lastVisit}</button></td>
                                <td><button className="close-button" onClick={() => updateSelectedUser(row)}>{row.checkedOut}</button></td>
                            </tr>
                        })
                    }

                    <tr>
                        <td id="bottom-left"><button className="open-button">End of list</button></td>
                        <td><button className="middle-button">End of list</button></td>
                        <td><button className="middle-button">End of list</button></td>
                        <td><button className="middle-button">End of list</button></td>
                        <td><button className="middle-button">End of list</button></td>
                        <td id="bottom-right"><button className="close-button">End of list</button></td>
                    </tr>
                </tbody>
            </table>

            <button className="btn btn-danger" onClick={checkSelection}>Check Out Selected Account</button>
            <p style={{color: "red"}}><b>{inUseMsg}</b></p>
          </main>
  );
}