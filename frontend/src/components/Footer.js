import React from 'react';
import '../../src/index.css';  // Asegúrate de crear un archivo CSS para estilizar el header

function Footer() {
  return (
    <footer className="footer text">
      <div className="footer-content">
        <p>Contacto: horologium@horologium.com</p>
        <p>© 2024 Franco Pizzichini Todos los derechos reservados.</p>
        <div>
          <a href="/" target="_blank" rel="noopener noreferrer" className="button-28">Facebook</a>
          <a href="/" target="_blank" rel="noopener noreferrer" className="button-28">Twitter</a>
          <a href="/" target="_blank" rel="noopener noreferrer" className="button-28">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
