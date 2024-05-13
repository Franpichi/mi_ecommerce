import React from 'react';
import '../../src/index.css';  // Asegúrate de crear un archivo CSS para estilizar el header

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Contacto: info@tusitio.com</p>
        <p>© 2024 Tu Empresa. Todos los derechos reservados.</p>
        <div className="social-links">
          <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="http://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="http://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
