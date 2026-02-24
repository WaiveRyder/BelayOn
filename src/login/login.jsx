import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({email, password, setEmail, setPassword, updateLoggedIn}) {
    const nav = useNavigate();

    function registerUser() {
        localStorage.setItem("user", email)
        updateLoggedIn("Logout")
        nav("/database")
    }

    function loginUser() {
        localStorage.setItem("user", email)
        updateLoggedIn("Logout")
        nav("/database")
    }

    function logoutUser() {
        localStorage.removeItem("user")
    }

  return (
    <div className="body">
        <main>
                <h1>Welcome to BelayOn!</h1>
                <h2>Please login or sign up below.</h2>

                    <div>
                        @ Email Address
                        <input type="email" className="form-control" onChange={(e) => {setEmail(e.target.value)}} value={email} required placeholder="enter email" />
                    </div>
                    <div>
                        🔒Password
                        <input type="password" className="form-control" onChange={(e) => {setPassword(e.target.value)}} value={password} required placeholder="password" />
                    </div>
                    <div className="login-form">
                        <button className="btn btn-outline-primary me-2" onClick={loginUser} disabled={!email || !password}>Login</button>
                        <button className="btn btn-primary" onClick={registerUser} disabled={!email || !password}>Sign Up</button>
                    </div>

        </main>
    </div>
  );
}