import React, { useState, useEffect } from 'react';
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
            <h1>Admin Panel</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.email} - <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
