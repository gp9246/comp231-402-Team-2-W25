// routes/userRoutes.js: User management routes
const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, authorizeRole(['moderator', 'admin']), userController.getAllUsers);
router.delete('/:id', verifyToken, authorizeRole(['admin']), userController.deleteUser);
router.patch('/:id/ban', verifyToken, authorizeRole(['moderator', 'admin']), userController.banUser);
router.patch('/:id/unban', verifyToken, authorizeRole(['moderator', 'admin']), userController.unbanUser);

module.exports = router;