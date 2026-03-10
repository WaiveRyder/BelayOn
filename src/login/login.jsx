import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({email, password, setEmail, setPassword, updateLoggedIn}) {
    const nav = useNavigate();

    const [errorMsg, updateErrorMsg] = React.useState("")

    async function registerUser() {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password })
        });

        let responseBody = {};
        try {
            responseBody = await response.json();
        } catch {
            responseBody = {};
        }

        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify({email: email}))
            updateLoggedIn(true);
            updateErrorMsg("");
            nav("/database");
        } else if (response.status === 400 || response.status === 409) {
            updateErrorMsg(responseBody.msg);
        } else {
            updateErrorMsg("Error: unexpected error occured");
        }
    }

    async function loginUser() {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });


        let responseBody = {};
        try {
            responseBody = await response.json();
        } catch {
            responseBody = {};
        }

        if (response.status === 200) {
            localStorage.setItem("user", JSON.stringify({email: email}));
            updateLoggedIn(true);
            updateErrorMsg("");
            nav("/database");
        } else if (response.status === 401 || response.status === 400) {
            updateErrorMsg(responseBody.msg);
        } else {
            updateErrorMsg("Error: unexpected error occured")
        }
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
                    <p style={{color: "red"}}><b>{errorMsg}</b></p>
        </main>
    </div>
  );
}