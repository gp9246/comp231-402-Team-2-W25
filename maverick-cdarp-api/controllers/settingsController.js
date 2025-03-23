// controllers/settingsController.js: User settings management logic
const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

const updateSettings = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Settings update validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedUser = await userService.updateSettings(req.user.userId, req.body);
    res.json(updatedUser);
  } catch (error) {
    logger.error(`Failed to update settings: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Password change validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { oldPassword, newPassword } = req.body;
    const result = await userService.changePassword(req.user.userId, oldPassword, newPassword);
    res.json(result);
  } catch (error) {
    logger.error(`Failed to change password: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateSettings, changePassword };