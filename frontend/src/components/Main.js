import React from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/home');
    };

    const goToLogin = () => {
        navigate('/login');
    };

    const goToLoginAdmin = () => {
        navigate('/login-admin');
    };

    const goToRegister = () => {
      navigate('/register');
  };

    return (
        <div className="main">
            <div className="button-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <button className="button-28" onClick={goToRegister}>Registro</button>
                <button className="button-28" onClick={goToLogin}>Usuario</button>
                <button className="button-28" onClick={goToLoginAdmin}>Administrador</button>
            </div>
            <a onClick={goToHome} style={{ cursor: 'pointer' }}>
                <img src="https://res.cloudinary.com/dipbwzqab/image/upload/v1715705382/Horologium/portada_oqawbq.webp" alt="Imagen de bienvenida" className="mb-6 mx-auto" />
            </a>
        </div>
    );
};

export default Main;
