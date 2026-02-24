import React from 'react';
import './database.css';

export const rows = [
        {name: "Johnathan Tryall", birthday: "01/07/2002", email: "j.tryall@yahoo.com", type: "Member", lastVisit: "01/23/2006", checkedOut: "No"},
        {name: "Samantha Smith", birthday: "07/12/2000", email: "s.smith@gmail.com", type: "Guest", lastVisit: "01/15/2026", checkedOut: "Terry"},
        {name: "Peter Quill", birthday: "10/30/1980", email: "startlord@hotmail.com", type: "Guest", lastVisit: "01/17/2026", checkedOut: "No"},
        {name: "Michael Jackson", birthday: "08/29/1958", email: "smoothcriminal@hehe.com", type: "Guest", lastVisit: "01/31/1988", checkedOut: "No"},
        //{name: "End of list", birthday: "End of list", email: "End of list", type: "End of list", lastVisit: "End of list", checkedOut: "End of list"},
    ]

export function Database({selectedUser, updateSelection}) {
    


  return (
          <main>
            <h1>Database</h1>

            <p>Logged in as: User. All edits will be logged under this name.</p>
            <p>Selected User: {selectedUser}</p>

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
                        rows.map((row, idx) => {
                            return <tr key={idx}>
                                <td><button className="open-button" onClick={() => {updateSelection(row.name)}}>{row.name}</button></td>
                                <td><button className="middle-button" onClick={() => {updateSelection(row.name)}}>{row.birthday}</button></td>
                                <td><button className="middle-button" onClick={() => {updateSelection(row.name)}}>{row.email}</button></td>
                                <td><button className="middle-button" onClick={() => {updateSelection(row.name)}}>{row.type}</button></td>
                                <td><button className="middle-button" onClick={() => {updateSelection(row.name)}}>{row.lastVisit}</button></td>
                                <td><button className="close-button" onClick={() => {updateSelection(row.name)}}>{row.checkedOut}</button></td>
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

            <form action="entrylookup">
                <button className="btn btn-danger">Check Out Selected Account</button>
            </form>
          </main>
  );
}