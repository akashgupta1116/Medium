import { Navigate, Outlet } from 'react-router-dom';
import React from 'react'

interface PrivateRouteProps {
    isAuthenticated: boolean;
    children: React.ReactNode
}

const ProtectedRoute = ({isAuthenticated, children}: PrivateRouteProps) => {
    if(!isAuthenticated){
        return <Navigate to = "/signin"/>
    }
    return children
}

export default ProtectedRoute