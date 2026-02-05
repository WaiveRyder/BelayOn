import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Database } from './database/database';
import { Entrylookup } from './entrylookup/entrylookup';
import { Createaccount } from './createaccount/createaccount';
import { About } from './about/about';

export default function App() {
  return (
        <BrowserRouter>
          <body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            <header>
              <h1 id="page-title">BelayOn</h1>

              <nav>
                  <menu>
                    <li><NavLink className='navbar-link' to='login'>Login</NavLink></li>
                    <li><NavLink className='navbar-link' to='database'>Database</NavLink></li>
                    <li><NavLink className='navbar-link' to='createaccount'>Create New Customer</NavLink></li>
                    <li><NavLink className='navbar-link' to='entrylookup'>View Customer</NavLink></li>
                    <li><NavLink className='navbar-link' to='about'>About</NavLink></li>
                  </menu>
              </nav>
            </header>

            <Routes>
              <Route path='/' element={<Login />} exact />
              <Route path='/play' element={<Play />} />
              <Route path='/scores' element={<Scores />} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<NotFound />} />
            </Routes>

            <footer id="align-text">
              <p> <span id="author">Nathan Hunt</span><a id='github-link' href="https://github.com/WaiveRyder/BelayOn" target="_blank">GitHub</a></p>
          </footer>
          </body>
        </BrowserRouter>    
  );
}