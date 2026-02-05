import React from 'react';
import './entrylookup.css'

export function Entrylookup() {
  return (
            <main>
            <h1>Account Viwer</h1>

            <h2>Now Viewing Peter Quill</h2>

            <form id="grid-form" method="get" action="database.html">
                <div class="row">
                    <div class="col">
                        <label for="inputName">First Name</label>
                        <input type="text" class="form-control" id="inputName" value="Peter" placeholder="First Name" required />
                    </div>
                    <div class="col">
                        <label for="inputMiddleName">Middle Name</label>
                        <input type="text" class="form-control" id="inputMiddleName" value="" placeholder="Middle Name" />
                    </div>
                    <div class="col">
                        <label for="inputLastName">Last Name</label>
                        <input type="text" class="form-control" id="inputLastName" value="Quill" placeholder="Last Name" required />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label for="inputDOB">Date of Birth</label>
                        <input type="date" class="form-control" id="inputDOB" value="1980-10-30" required />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label for="inputEmail">Email</label>
                        <input type="email" class="form-control" id="inputEmail" value="starlord@hotmail.com" placeholder="Email" required />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label for="memberType">Type</label>
                        <select name="type" id="memberType" class="form-control" value="Guest">
                            <option value="Guest">Guest</option>
                            <option value="Member">Member</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label for="lastVisit">Last Visit</label>
                        <input class="form-control" type="date" id="lastVisit" readonly value="2026-01-17" />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        Notes:
                        <div class="notes-list">
                            <textarea class="form-control" name="note" id="note1" readonly>Likes to listen to music while climbing. -Sarah 08/24/2025</textarea>
                            <textarea class="form-control" name="note" id="note2" readonly>Needs belay certification. -John 01/16/25</textarea>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <label for="new-note-form">Create New Note:</label>
                        <textarea class="form-control" name="note" id="new-note-form" placeholder="Type new note..."></textarea>
                    </div>
                    <div class="col">
                        <button type="button" id="submit-new-note" class="btn btn-warning">Save Note</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="submit-buttons">
                            <button type="submit" class="btn btn-info">Save and Check In</button>
                        </div>
                    </div>

                    <div class="col">
                        <div class="submit-buttons">
                            <button type="submit" class="btn btn-danger">Exit and Check In</button>
                        </div>
                    </div>
                </div>
            </form> 
        </main>
  );
}