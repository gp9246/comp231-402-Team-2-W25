// controllers/adminController.js: Admin dashboard logic
const reportService = require('../services/reportService');
const userService = require('../services/userService');
const logger = require('../utils/logger');

const getAdminDashboard = async (req, res) => {
  try {
    const allReports = await reportService.getAllReports();
    const allUsers = await userService.getAllUsers();
    res.json({ reports: allReports, users: allUsers });
  } catch (error) {
    logger.error(`Failed to get admin dashboard data: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAdminDashboard };