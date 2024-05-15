import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const login = async (email, password, isAdminLogin = false) => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                if (isAdminLogin && data.user.role !== 'admin') {
                    toast.error("Acceso denegado. Solo los administradores pueden acceder.");
                    return null; // No actualizar el estado si no es administrador
                }

                setUser({ ...data.user, email });
                localStorage.setItem('user', JSON.stringify({ ...data.user, email }));
                localStorage.setItem('token', data.token);
                toast.success('Sesión iniciada correctamente');
                return data.user; // Devuelve el usuario completo
            } else {
                toast.error(data.message || 'Acceso denegado');
                return null;
            }
        } catch (error) {
            toast.error(`Login failed: ${error.message}`);
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        clearCart();
        setUser(null);
        navigate('/login');
        toast.info('Sesión cerrada');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
