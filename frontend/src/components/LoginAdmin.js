import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await login(email, password, true); // Pass a flag to identify admin login

        if (user && user.role === 'admin') {
            navigate('/admin-panel');  // Redirige al panel de administración
        } else {
            toast.error("Acceso denegado. Solo los administradores pueden acceder.");
        }
    };

    return (
        <div className="login-container">
            <h2 className='horologium-title'>Login Administrador</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label className='login-label title'>
                    Email:
                    <input className="login-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label className='login-label title'>
                    Password:
                    <input className="login-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button className='button-28' type="submit">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default LoginAdmin;
