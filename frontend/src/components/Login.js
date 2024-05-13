import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext'; // Importa el contexto de autenticación

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Obtén la función login del contexto de autenticación

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);  // Asegúrate de esperar a que se complete el login
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
