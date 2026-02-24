import React from 'react';
import './database.css';
import { useNavigate } from 'react-router-dom';

export function Database({databaseCustomers, selectedUser, updateSelection}) {
    const nav = useNavigate()

    function checkSelection() {
        if(selectedUser.checkedOut === "No") {
            nav("/entrylookup")
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
                                <td><button className="open-button" onClick={() => updateSelection(row)}>{row.name}</button></td>
                                <td><button className="middle-button" onClick={() => updateSelection(row)}>{row.birthday}</button></td>
                                <td><button className="middle-button" onClick={() => updateSelection(row)}>{row.email}</button></td>
                                <td><button className="middle-button" onClick={() => updateSelection(row)}>{row.type}</button></td>
                                <td><button className="middle-button" onClick={() => updateSelection(row)}>{row.lastVisit}</button></td>
                                <td><button className="close-button" onClick={() => updateSelection(row)}>{row.checkedOut}</button></td>
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
          </main>
  );
}