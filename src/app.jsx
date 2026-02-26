import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';
import { BrowserRouter, data, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Logout } from './login/logout';
import { Database } from './database/database';
import { Entrylookup } from './entrylookup/entrylookup';
import { Createaccount } from './createaccount/createaccount';
import { About } from './about/about';

export default function App() {
  const [userDatabase, updateUserDatabase] = React.useState(localStorage.getItem("userDatabase") || []);
  const getCredentials = (localStorage.getItem("user") || "") === "" ? "" : JSON.parse(localStorage.getItem("user"))

  const [email, setEmail] = React.useState(getCredentials === "" ? "" : getCredentials.email);
  const [password, setPassword] = React.useState(getCredentials === "" ? "" : getCredentials.password);
  const [loggedIn, updateLoggedIn] = React.useState((localStorage.getItem("user") || "") !== "");

  const [selectedUser, updateSelectedUser] = React.useState("")

  const [databaseCustomers, updateDatabase] = React.useState(JSON.parse(localStorage.getItem("database")) || [
          {name: "Johnathan Tryall", birthday: "1/07/2002", email: "j.tryall@yahoo.com", type: "Member", lastVisit: "1/23/2006", checkedOut: "No", uuid: "c459b962-4a48-4ca3-9250-2db963f94889"},
          {name: "Samantha Smith", birthday: "7/12/2000", email: "s.smith@gmail.com", type: "Guest", lastVisit: "1/15/2026", checkedOut: 'No', uuid: "d68c4a55-942a-4431-aa34-180c9dbc299b"},
          {name: "Peter Quill", birthday: "10/30/1980", email: "startlord@hotmail.com", type: "Guest", lastVisit: "1/17/2026", checkedOut: "No", uuid: "3b15cbad-2d15-48a3-a710-4e0e2b6dd5eb"},
          {name: "Michael Jackson", birthday: "8/29/1958", email: "smoothcriminal@hehe.com", type: "Guest", lastVisit: "1/31/1988", checkedOut: "No", uuid: "11afaeb2-7e1c-449c-84c3-73e011fc2476"},
          {name: "Peter Parker", birthday: "8/10/2006", email: "notspiderman@gmail.com", type: "Member", lastVisit: "1/25/2026", checkedOut: "No", uuid: "97c34178-5c6f-47c2-a431-68af97731ae2"},
          {name: "Loki Laufeyson", birthday: "12/17/965", email: "godofmischeif@hotmail.com", type: "Guest", lastVisit: "2/25/2026", checkedOut: "No", uuid: "95290908-8fb5-43cd-9f0e-4ba3dc8e0b94"},
          //{name: "End of list", birthday: "End of list", email: "End of list", type: "End of list", lastVisit: "End of list", checkedOut: "End of list"},
      ])

  useEffect(() => {
    localStorage.setItem("database", JSON.stringify(databaseCustomers))
  }, [])

  return (
        <BrowserRouter>
            <div className="body">
            <header>
              <h1 id="page-title">BelayOn</h1>

              <nav>
                  <menu>
                    {loggedIn === false ? <li><NavLink className='navbar-link' to=''>Login</NavLink></li> : <Logout updateLoggedIn={updateLoggedIn} />}
                    {loggedIn === true && <li><NavLink className='navbar-link' to='database'>Database</NavLink></li>}
                    {loggedIn === true && <li><NavLink className='navbar-link' to='createaccount'>Create New Customer</NavLink></li>}
                    <li><NavLink className='navbar-link' to='about'>About</NavLink></li>
                  </menu>
              </nav>
            </header>

            <Routes>
              <Route path='/' element={<Login email={email} password={password} setEmail={setEmail} setPassword={setPassword} updateLoggedIn={updateLoggedIn} />} exact />
              <Route path='/login' element={<Login email={email} password={password} setEmail={setEmail} setPassword={setPassword} updateLoggedIn={updateLoggedIn} userDatabase={userDatabase} updateUserDatabase={updateUserDatabase} />} exact />
              <Route path='/database' element={<Database email={email} databaseCustomers={databaseCustomers} updateDatabase={updateDatabase} selectedUser={selectedUser} updateSelectedUser={updateSelectedUser} />} />
              <Route path='/createaccount' element={<Createaccount databaseCustomers={databaseCustomers} updateDatabase={updateDatabase} />} />
              <Route path='/entrylookup' element={<Entrylookup email={email} databaseCustomers={databaseCustomers} updateDatabase={updateDatabase} selectedUser={selectedUser} updateSelectedUser={updateSelectedUser}/>} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<NotFound />} />
            </Routes>

            <footer id="align-text">
              <p> <span id="author">Nathan Hunt</span><a id='github-link' href="https://github.com/WaiveRyder/BelayOn" target="_blank">GitHub</a></p>
            </footer>
          </div>
        </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}