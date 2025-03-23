// routes/reportRoutes.js: Report submission and retrieval routes
const express = require('express');
const { body } = require('express-validator');
const reportController = require('../controllers/reportController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/',
  verifyToken,
  [
    body('websiteUrl').notEmpty().withMessage('Website URL is required'),
    body('accessibilityScore').isNumeric().withMessage('Accessibility score must be a number'),
    body('reportDetails').isObject().withMessage('Report details must be an object'),
  ],
  reportController.submitReport
);

router.get('/', verifyToken, reportController.getReports);
router.get('/admin', verifyToken, authorizeRole(['admin']), reportController.getAllReports);
router.get('/public', reportController.getPublicReports);
router.get('/flagged', verifyToken, authorizeRole(['moderator', 'admin']), reportController.getFlaggedReports);
router.patch('/:id/flag', verifyToken, authorizeRole(['moderator', 'admin']), reportController.flagReport);
router.patch('/:id/unflag', verifyToken, authorizeRole(['admin']), reportController.unflagReport);
router.delete('/:id', verifyToken, authorizeRole(['admin']), reportController.deleteReport);

module.exports = router;