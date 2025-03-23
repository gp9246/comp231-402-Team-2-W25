// routes/adminRoutes.js: Admin dashboard routes
const express = require('express');
const adminController = require('../controllers/adminController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/dashboard', verifyToken, authorizeRole(['admin']), adminController.getAdminDashboard);

module.exports = router;