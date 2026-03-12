import React from "react";
import { useNavigate } from 'react-router-dom';

export function Logout({updateLoggedIn, setPassword}) {
    const nav = useNavigate()

    async function logoutUser() {
        const response = await fetch("/api/logout", {method: "DELETE"});
        localStorage.removeItem("user")
        setPassword("");
        updateLoggedIn(false)
        nav("/login")
    }

    return (
        <button className="btn btn-primary" onClick={logoutUser}>Logout</button>
    )
}