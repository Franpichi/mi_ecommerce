import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate en lugar de useHistory
import { toast, ToastContainer } from 'react-toastify';  // Importa los componentes de react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Importa el CSS para los toast

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Utiliza useNavigate en lugar de useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            toast.success('User registered successfully! Redirecting to login...', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/login');  // Utiliza navigate para redireccionar a la página de login
            }, 5000);  // Espera 5 segundos antes de redirigir
        } else {
            toast.error(`Registration failed: ${data.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="login-container">
          <h2 className='horologium-title'>Register</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <label className='login-label title'>
              Email:
              <input className="login-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label className='login-label title'>
              Password:
              <input className="login-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button className='button-28' type="submit">Register</button>
          </form>
          <ToastContainer />
        </div>
      );
    }


export default Register;
