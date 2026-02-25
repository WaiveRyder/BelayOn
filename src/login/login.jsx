import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({email, password, setEmail, setPassword, updateLoggedIn}) {
    const nav = useNavigate();

    const [errorMsg, updateErrorMsg] = React.useState("")

    function registerUser() {
        const getCredentials = JSON.parse(localStorage.getItem("user"))
        if (getCredentials == null) {
            localStorage.setItem("user", JSON.stringify({email: email, password: password}))
            updateLoggedIn(true)
            updateErrorMsg("")
            nav("/database")
        } else if(getCredentials.email === email) {
            updateErrorMsg("ERROR: USERNAME IS ALREADY TAKEN")
        }
    }

    function loginUser() {
        const getCredentials = JSON.parse(localStorage.getItem("user"))

        if(getCredentials == null) {
            updateErrorMsg("ERROR: USERNAME NOT RECOGNIZED")
        } else if(getCredentials.email === email && getCredentials.password === password) {
            updateLoggedIn(true)
            updateErrorMsg("")
            nav("/database")
        } else if(getCredentials.email === email){
            updateErrorMsg("ERROR: WRONG PASSWORD")
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