import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

function Header() {
    const { state } = useCart();
    const { user, logout } = useAuth();

    return (
        <header className="header flex items-center justify-between py-4 px-6">


            <div className='logo'> 
                <Link to="/" className="title">
                <img src="https://res.cloudinary.com/dipbwzqab/image/upload/v1715707747/Horologium/Horo-2_yv80do.png" alt="Horologium" />
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className='button-28'>{user.email}</span>
                        <button onClick={logout} className="button-28">Cerrar Sesion</button>
                    </>
                ) : (
                    <Link to="/login" className="button-28">Iniciar Sesión</Link>
                )}
                <Link to="/cart" className="flex items-center ml-4">
                    <img src="https://res.cloudinary.com/dipbwzqab/image/upload/v1715631959/Horologium/carrito-de-compras_oku36b.png" alt="cart" width={40} height={40} className="h-12 pt-16" />
                    <span className="ml-1 button-28">{state.items.length}</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
