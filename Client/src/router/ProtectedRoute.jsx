import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {

    if (!localStorage.getItem('accessToken')) {

        return <Navigate to='/login' />;
    }
    return <Outlet />;
}

export default ProtectedRoute