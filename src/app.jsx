import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
        <body>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
          <header>
            <h1 id="page-title">BelayOn</h1>

            <nav>
                <menu>
                    <li><a class="navbar-link-main" href="index.html">Login</a></li>
                    <li><a class="navbar-link" href="database.html">Database</a></li>
                    <li><a class="navbar-link" href="createaccount.html">Create New Account</a></li>
                    <li><a class="navbar-link" href="entrylookup.html">View Account</a></li>
                    <li><a class="navbar-link" href="about.html">About</a></li>
                </menu>
            </nav>
          </header>

          <main>App Components go here</main>

          <footer id="align-text">
            <p> <span id="author">Nathan Hunt</span><a id='github-link' href="https://github.com/WaiveRyder/BelayOn" target="_blank">GitHub</a></p>
        </footer>
        </body>    
  );
}