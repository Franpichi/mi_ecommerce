import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Asegúrate de haber creado y exportado este contexto

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useAuth(); // Usamos el hook personalizado para acceder al estado de autenticación

    return (
        <Route
            {...rest}
            element={
                user ? (
                    children
                ) : (
                    // Si no hay usuario logueado, redirigimos a la página de login
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
