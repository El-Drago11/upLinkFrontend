import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}) => {

    const {token} = useSelector((store)=>store.auth)
    const {user} = useSelector((store)=>store.profile)
    console.log("User : ",user)
    if(token !== 'null' && user.accountType=='Admin'){
        return children
    }else{
        return <Navigate to="/"/>
    }
}

export default AdminRoute