import React from 'react';

export function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function registerUser() {
        localStorage.setItem("user", email)
    }

    function loginUser() {
        localStorage.setItem("user", email)
    }

  return (
    <div className="body">
        <main>
                <h1>Welcome to BelayOn!</h1>
                <h2>Please login or sign up below.</h2>
                <form method="get" id='login'>
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
                </form>
        </main>
    </div>
  );
}