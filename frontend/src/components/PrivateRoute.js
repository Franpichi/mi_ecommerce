import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useAuth(); 

    return (
        <Route
            {...rest}
            element={
                user ? (
                    children
                ) : (
                    <Navigate
                        to="/login"
                        state={{ from: rest.location }}
                        replace
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
