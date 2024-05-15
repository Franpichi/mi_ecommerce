const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const passport = require('passport');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn('Attempt to register with existing email', { email });
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new User({ email, password, role: role || 'user' });
    await newUser.save();
    logger.info('User registered successfully', { email });
    res.status(201).json(newUser);
  } catch (error) {
    logger.error('Register Error', { error: error.message, email });
    res.status(500).json({ message: "Error registering new user.", error: error.message });
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      logger.error('Login failed', { error: err });
      return res.status(500).json({ message: 'An error occurred during login', error: err.message });
    }
    if (!user) {
      logger.warn('Login attempt failed', { info });
      return res.status(401).json({ message: info ? info.message : 'Login failed' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, token: token, user: { email: user.email, role: user.role } });
  })(req, res, next);
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user role", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};
