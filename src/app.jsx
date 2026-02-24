import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Database } from './database/database';
import { Entrylookup } from './entrylookup/entrylookup';
import { Createaccount } from './createaccount/createaccount';
import { About } from './about/about';

export default function App() {
  const [email, setEmail] = React.useState(localStorage.getItem("user") || "");
  const [password, setPassword] = React.useState("");
  const [loggedIn, updateLoggedIn] = React.useState("Login");


  return (
        <BrowserRouter>
            <div className="body">
            <header>
              <h1 id="page-title">BelayOn</h1>

              <nav>
                  <menu>
                    <li><NavLink className='navbar-link' to=''>{loggedIn}</NavLink></li>
                    {(localStorage.getItem("user") || "") !== "" && <li><NavLink className='navbar-link' to='database'>Database</NavLink></li>}
                    {(localStorage.getItem("user") || "") !== "" && <li><NavLink className='navbar-link' to='createaccount'>Create New Customer</NavLink></li>}
                    {(localStorage.getItem("user") || "") !== "" && <li><NavLink className='navbar-link' to='entrylookup'>View Customer</NavLink></li>}
                    <li><NavLink className='navbar-link' to='about'>About</NavLink></li>
                  </menu>
              </nav>
            </header>

            <Routes>
              <Route path='/' element={<Login email={email} password={password} setEmail={setEmail} setPassword={setPassword} updateLoggedIn={updateLoggedIn}/>} exact />
              <Route path='/login' element={<Login email={email} password={password} setEmail={setEmail} setPassword={setPassword} updateLoggedIn={updateLoggedIn}/>} exact />
              <Route path='/database' element={<Database />} />
              <Route path='/createaccount' element={<Createaccount />} />
              <Route path='/entrylookup' element={<Entrylookup />} />
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