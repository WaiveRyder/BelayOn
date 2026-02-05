import React from 'react';
import './database.css';

export function Database() {
  return (
          <main>
            <h1>Database</h1>

            <p>Logged in as: User. All edits will be logged under this name.</p>

            <form id="search" method="get">
                <input type="search" class="form-control" id="search-box" required placeholder="Name or Email" />
                <button type="button" class="btn btn-info" id="search-button">Search🔎</button>
            </form>

            <br />

            <table class="table">
                <caption>
                    List of accounts that match search criteria.
                    <form id="new-account-form" action="createaccount.html">
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
                    <tr>
                        <td><button class="open-button">Johnathan Tryall</button></td>
                        <td><button class="middle-button">01/07/2002</button></td>
                        <td><button class="middle-button">j.tryall@yahoo.com</button></td>
                        <td><button class="middle-button">Member</button></td>
                        <td><button class="middle-button">01/23/2026</button></td>
                        <td><button class="close-button">No</button></td>
                    </tr>

                    <tr>
                        <td><button class="open-button">Samantha Smith</button></td>
                        <td><button class="middle-button">07/12/2000</button></td>
                        <td><button class="middle-button">s.smith@gmail.com</button></td>
                        <td><button class="middle-button">Guest</button></td>
                        <td><button class="middle-button">01/15/2026</button></td>
                        <td><button class="close-button">Terry</button></td>
                    </tr>

                    <tr>
                        <td><button class="open-button">Peter Quill</button></td>
                        <td><button class="middle-button">10/30/1980</button></td>
                        <td><button class="middle-button">starlord@hotmail.com</button></td>
                        <td><button class="middle-button">Guest</button></td>
                        <td><button class="middle-button">01/17/2026</button></td>
                        <td><button class="close-button">No</button></td>
                    </tr>

                    <tr>
                        <td><button class="open-button">Michael Jackson</button></td>
                        <td><button class="middle-button">08/29/1958</button></td>
                        <td><button class="middle-button">smoothcriminal@hehe.com</button></td>
                        <td><button class="middle-button">Guest</button></td>
                        <td><button class="middle-button">01/31/1988</button></td>
                        <td><button class="close-button">No</button></td>
                    </tr>

                    <tr>
                        <td id="bottom-left"><button class="open-button">End of list</button></td>
                        <td><button class="middle-button">End of list</button></td>
                        <td><button class="middle-button">End of list</button></td>
                        <td><button class="middle-button">End of list</button></td>
                        <td><button class="middle-button">End of list</button></td>
                        <td id="bottom-right"><button class="close-button">End of list</button></td>
                    </tr>
                </tbody>
            </table>

            <form action="entrylookup.html">
                <button class="btn btn-danger">Check Out Selected Account</button>
            </form>
          </main>
  );
}