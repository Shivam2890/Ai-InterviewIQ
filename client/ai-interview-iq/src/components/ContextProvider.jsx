import React, { createContext, useEffect, useState } from 'react'

export const UserProvider = createContext()
//ContextProvider wrap in the authprotedroutes bez 
const ContextProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        const newDetails = JSON.parse(localStorage.getItem('user'))
        setUserDetails(newDetails)
    }, [])
    return (
        <UserProvider.Provider value={{ userDetails }}>
            {children}
        </UserProvider.Provider>
    )
}

export default ContextProvider