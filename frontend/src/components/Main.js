// En tu componente Main.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importa el polyfill de path-browserify
import path from 'path-browserify';

function Main() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/home');
    };

    return (
        <div>
            <h1>Bienvenido a Horologium</h1>
            <p>Descubre nuestra colección exclusiva de relojes.</p>
            <button onClick={goToHome}>Ir a la tienda</button>
        </div>
    );
}

export default Main;
