import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', password: '', role: 'user' });

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleAddUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      const data = await response.json();
      if (response.ok) {
        setUsers([...users, data]); 
        setNewUser({ email: '', password: '', role: 'user' });
        toast.success('User added successfully!');
      } else if (response.status === 409) {
        toast.error(`Error adding user: User already exists`);
      } else {
        toast.error(`Error adding user: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Error adding user');
    }
  };

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:3001/api/users/${userId}`, {
      method: 'DELETE'
    })
      .then(() => {
        setUsers(users.filter(user => user._id !== userId));
        toast.success('User deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user');
      });
  };

  const handleRoleChange = (userId, newRole) => {
    fetch(`http://localhost:3001/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole })
    })
      .then(response => response.json())
      .then(updatedUser => {
        setUsers(users.map(user => (user._id === userId ? updatedUser : user)));
        toast.success('User role updated successfully');
      })
      .catch(error => {
        console.error('Error updating user role:', error);
        toast.error('Error updating user role');
      });
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={e => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={e => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleAddUser}>Agregar Usuario</button>
      </div>
      <ul>
        {users.map((user, index) => (
          <li key={`${user._id}-${index}`}>
            {user.email} - {user.role}
            <button onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
            <button onClick={() => handleRoleChange(user._id, user.role === 'admin' ? 'user' : 'admin')}>
              Cambiar a {user.role === 'admin' ? 'User' : 'Admin'}
            </button>
          </li>
        ))}
      </ul>
      <Link to="/admin-panel">
        <button>Volver al Panel de Administración</button>
      </Link>
      <ToastContainer />
    </div>
  );
}

export default UserManagement;
