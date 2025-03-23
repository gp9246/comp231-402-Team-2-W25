// routes/settingsRoutes.js: User settings routes
const express = require('express');
const { body } = require('express-validator');
const settingsController = require('../controllers/settingsController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.patch(
  '/',
  verifyToken,
  [
    body('darkMode').optional().isBoolean().withMessage('Dark mode must be a boolean'),
    body('language').optional().isString().withMessage('Language must be a string'),
    // Add validation for other settings as needed
  ],
  settingsController.updateSettings
);

router.patch(
  '/password',
  verifyToken,
  [
    body('oldPassword').notEmpty().withMessage('Old password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  settingsController.changePassword
);

module.exports = router;