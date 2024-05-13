import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function Header() {
    const { state } = useCart();
    const { user, logout } = useAuth();

    console.log("Usuario en el Header:", user); // Verifica que el usuario esté definido aquí

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="logo_url_here" alt="Logo" />
                </Link>
            </div>
            <div className="header-links">
                {user ? (
                    <>
                        <span>{user.email}</span> 
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Iniciar Sesión</Link> /* Muestra el botón de inicio de sesión */
                )}
                <Link to="/cart">Carrito ({state.items.length})</Link>
            </div>
            <nav className="main-nav">
                <Link to="/">Home</Link>
                <Link to="/product">Productos</Link>
                <Link to="/about">Acerca De</Link>
                <Link to="/contact">Contacto</Link>
            </nav>
        </header>
    );
}

export default Header;
