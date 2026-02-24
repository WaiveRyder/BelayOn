import React from "react";
import { useNavigate } from 'react-router-dom';

export function Logout({updateLoggedIn}) {
    const nav = useNavigate()

    function logoutUser() {
        localStorage.removeItem("user")
        updateLoggedIn("Login")
        nav("/login")
    }

    return (
        <button className="btn btn-primary" onClick={logoutUser}>Logout</button>
    )
}