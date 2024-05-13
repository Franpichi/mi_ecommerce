/* import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentStatus = () => {
  const location = useLocation();
  const { success } = location.state;
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = () => {
    // Lógica para manejar el envío de email
    alert(`Email guardado: ${email}`);
  };

  return (
    <div>
      {success ? (
        <>
          <h2>Compra exitosa</h2>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Ingrese su email"
          />
          <button onClick={handleEmailSubmit}>Guardar Email</button>
        </>
      ) : (
        <h2>Compra denegada</h2>
      )}
    </div>
  );
};

export default PaymentStatus;
 */

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentStatus = () => {
  const location = useLocation();
  const { success, cartItems } = location.state; // Asumiendo que pasas los items del carrito también
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async () => {
    if (!email) {
      alert('Por favor ingrese un email válido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, cartItems })
      });

      const responseData = await response.json();

      if (responseData.success) {
        alert('E-ticket enviado a tu email.');
      } else {
        alert('No se pudo enviar el e-ticket. Intente nuevamente.');
      }
    } catch (error) {
      console.error('Error al enviar el email:', error);
      alert('Error al enviar el email. Intente nuevamente.');
    }
  };

  return (
    <div>
      {success ? (
        <>
          <h2>Compra exitosa</h2>
          <p>¿Quieres un e-ticket de tu compra? Déjanos tu email</p>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Ingrese su email"
          />
          <button onClick={handleEmailSubmit}>Enviar</button>
        </>
      ) : (
        <h2>Compra denegada</h2>
      )}
    </div>
  );
};

export default PaymentStatus;