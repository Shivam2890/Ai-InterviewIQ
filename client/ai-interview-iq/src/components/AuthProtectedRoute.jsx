import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthProtectedRoute = () => {
    //{replace:true} should not store the previos history or replace with the current data so
    // the user won't able to go back to the signup/login page again
    if (!localStorage.getItem("user")) return <Navigate to='/login'  replace/>
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AuthProtectedRoute