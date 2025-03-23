// controllers/authController.js: User authentication logic
const authService = require('../services/authService');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`User registration validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;
    const user = await authService.registerUser(username, email, password);
    logger.info(`User registered: ${username} (${email})`);
    res.status(201).json({ message: 'User registered successfully', user: { ...user.toObject(), password: undefined } }); // Exclude password from response
  } catch (error) {
    logger.error(`User registration failed: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`User login validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    logger.info(`User logged in: ${email}`);
    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    logger.error(`User login failed: ${error.message}`);
    res.status(401).json({ error: error.message });
  }
};

module.exports = { register, login };