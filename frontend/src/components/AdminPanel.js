/* import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../contexts/CartContext';  // Ajusta la ruta de importación aquí

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const { clearCart } = useCart();  // Suponiendo que necesitas usar el clearCart

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch('/api/users', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        if (response.ok) {
            setUsers(data.users);  // Asegúrate de ajustar según la estructura de tus datos
        } else {
            toast.error(data.message || 'Failed to fetch users');
        }
    };

    const handleDelete = async (userId) => {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        if (response.ok) {
            setUsers(users.filter(user => user._id !== userId));
            toast.success('User deleted successfully');
        } else {
            toast.error(data.message || 'Failed to delete user');
        }
    };

    return (
        <div>
            <h1 className='horologium-title'>Admin Panel</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.email} - <button className='button-28' onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
 */

import React from 'react';
import { Link } from 'react-router-dom';

function AdminPanel() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <Link to="/admin/users">
        <button className="button-28">Usuarios</button>
      </Link>
      <Link to="/admin/products">
        <button className="button-28">Productos</button>
      </Link>
    </div>
  );
}

export default AdminPanel;
