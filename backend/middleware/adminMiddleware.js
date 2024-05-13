// Middleware para verificar si un usuario es administrador
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Acceso prohibido. Debes ser administrador.' });
  }
};

module.exports = isAdmin;
