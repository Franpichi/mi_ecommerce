import React from 'react';
import { useNavigate } from 'react-router-dom';
import path from 'path-browserify';

function Main() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/home');
    };

    return (
        <div className="main">
            <a onClick={goToHome} style={{ cursor: 'pointer' }}>
              <img src="https://res.cloudinary.com/dipbwzqab/image/upload/v1715705382/Horologium/portada_oqawbq.webp" alt="Imagen de bienvenida"  className="mb-6 mx-auto" />
            </a>
        </div>
      );
    };
    


export default Main;
