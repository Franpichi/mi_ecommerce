import React from 'react';
import { useNavigate } from 'react-router-dom';
import path from 'path-browserify';

function Main() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/home');
    };

    return (
        <div className='title'>
            <h1>Bienvenido a Horologium</h1>
            <img src="https://res.cloudinary.com/dipbwzqab/image/upload/v1715355998/Horologium/logo512_yxkmc7.png" alt="Imagen de bienvenida" width={300} height={600} className="mb-6 mx-auto" />

            <p>Descubre nuestra colección exclusiva de relojes.</p>
            <button className="button-28" onClick={goToHome}>Ir a la tienda</button>
        </div>
    );
}

export default Main;
