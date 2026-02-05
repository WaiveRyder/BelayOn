import React from 'react';

export function Login() {
  return (
    <div className="body">
        <main className="container-fluid bg-secondary text-center">
                <h1>Welcome to BelayOn!</h1>
                <h2>Please login or sign up below.</h2>
                <form method="get" id='login' action="database.html">
                    <div>
                        @ Email Address
                        <input type="email" className="form-control" required placeholder="enter email" />
                    </div>
                    <div>
                        🔒Password
                        <input type="enter password" className="form-control" required placeholder="password" />
                    </div>
                    <div className="login-form">
                        <button className="btn btn-outline-primary me-2">Login</button>
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                </form>
        </main>
    </div>
  );
}