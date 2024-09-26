import { Navigate } from 'react-router-dom';
import React from 'react'

interface PrivateRouteProps {
    isAuthenticated: boolean;
    children: React.ReactNode
}

const ProtectedRoute = (props : PrivateRouteProps) => {
    if(!props.isAuthenticated){
        return <Navigate to = "/signin"/>
    }
    return props.children
}

export default ProtectedRoute