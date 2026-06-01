import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
    const userCredentails = localStorage.getItem("user")

    if (userCredentails) {
        console.log("Hai Bhai user creentails")
    }
    //{replace:true} should not store the previos history or replace with the current data so
    // the user won't able to go back to the signup/login page again
    return userCredentails ? <Navigate to="/" replace /> : <Outlet />
}

export default ProtectedLayout