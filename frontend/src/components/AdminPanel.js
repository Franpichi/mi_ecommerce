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
