import React from 'react';
import './createaccount.css'
import { useNavigate } from 'react-router-dom';

export function Createaccount({databaseCustomers, updateDatabase}) {
    const nav = useNavigate();

    const [firstName, setFirstName] = React.useState("");
    const [middleName, setMiddleName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [birthday, setBirthday] = React.useState("");
    const [email, setEmail] = React.useState("");

    function addAccount() {
        const fullName = (middleName === "") ? (firstName + " " + lastName) : (firstName + " " + middleName + " " + lastName)
        const newRow = {name: fullName, birthday: new Date(birthday).toLocaleDateString(), email: email, type: "Guest", lastVisit: new Date().toLocaleDateString(), checkedOut: "No"}
        const newData = [...databaseCustomers, newRow]
        updateDatabase(newData)
        localStorage.setItem("database", JSON.stringify(newData))

        setFirstName("");
        setMiddleName("");
        setLastName("");
        setBirthday("");
        setEmail("");
        nav("/database")
    }

    return (
            <main>
            <h1 className="center-text">Create New Account</h1>

            <h2 className="center-text">Please enter required information below to create a new customer account.</h2>

                <div className="row">
                    <div className="col">
                        <label htmlFor="inputName">First Name</label>
                        <input type="text" className="form-control" id="inputName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="col">
                        <label htmlFor="inputMiddleName">Middle Name</label>
                        <input type="text" className="form-control" id="inputMiddleName" placeholder="Middle Name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="inputLastName">Last Name</label>
                        <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="inputDOB">Date of Birth</label>
                        <input type="date" className="form-control" id="inputDOB" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                </div>

                <div className="row">
                    <div id="create-account" className="col">
                        <button className="btn btn-danger" onClick={addAccount}>Create New Account</button>
                    </div>
                </div>
        </main>
  );
}