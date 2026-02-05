import React from 'react';
import './createaccount.css'

export function Createaccount() {
  return (
            <main>
            <h1 className="center-text">Create New Account</h1>

            <h2 className="center-text">Please enter required information below to create a new customer account.</h2>

            <form id="grid-form" method="get" action="database">
                <div className="row">
                    <div className="col">
                        <label htmlFor="inputName">First Name</label>
                        <input type="text" className="form-control" id="inputName" placeholder="First Name" required />
                    </div>
                    <div className="col">
                        <label htmlFor="inputMiddleName">Middle Name</label>
                        <input type="text" className="form-control" id="inputMiddleName" placeholder="Middle Name" />
                    </div>
                    <div className="col">
                        <label htmlFor="inputLastName">Last Name</label>
                        <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="inputDOB">Date of Birth</label>
                        <input type="date" className="form-control" id="inputDOB" required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="Email" required />
                    </div>
                </div>

                <div className="row">
                    <div id="create-account" className="col">
                        <button className="btn btn-danger">Create New Account</button>
                    </div>
                </div>
            </form>
        </main>
  );
}