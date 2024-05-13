/* const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const passport = require('passport');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn('Attempt to register with existing email', { email });
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    logger.info('User registered successfully', { email });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    logger.error('Register Error', { error: error.message, email });
    res.status(500).json({ message: "Error registering new user.", error: error.message });
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      logger.error('Login failed', { error: err, info });
      return res.status(401).json({ message: info ? info.message : 'Login failed' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, token: token, role: user.role });
  })(req, res, next);
};
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const passport = require('passport');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn('Attempt to register with existing email', { email });
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    logger.info('User registered successfully', { email });
    res.status(201).json({ message: "User registered successfully" });
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
    // Create a token and respond with it
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, token: token, user: { email: user.email, role: user.role } });
  })(req, res, next);
};
