import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);  
    };

    return (
        <div className="login-container">
          <h2 className='horologium-title'>Login</h2>
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

export default Login;
