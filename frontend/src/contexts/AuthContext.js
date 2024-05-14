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

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setUser({ ...data, email });
                localStorage.setItem('user', JSON.stringify({ ...data, email }));
                localStorage.setItem('token', data.token);
                navigate(data.role === 'admin' ? '/admin' : '/');
                toast.success('Sesión iniciada correctamente');
            } else {
                toast.error(data.message || 'Acceso denegado');
            }
        } catch (error) {
            toast.error(`Login failed: ${error.message}`);
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
