// controllers/userController.js: User management logic
const userService = require('../services/userService');
const logger = require('../utils/logger');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    logger.info('All users retrieved by admin/moderator');
    res.json(users);
  } catch (error) {
    logger.error(`Failed to retrieve all users by admin/moderator: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    logger.info(`User deleted by admin: ${req.params.id}`);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error(`Failed to delete user by admin: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const banUser = async (req, res) => {
  try {
    const user = await userService.banUser(req.params.id);
    logger.info(`User banned by admin/moderator: ${req.params.id}`);
    res.json({ message: 'User banned successfully', user });
  } catch (error) {
    logger.error(`Failed to ban user by admin/moderator: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const unbanUser = async (req, res) => {
  try {
    const user = await userService.unbanUser(req.params.id);
    logger.info(`User unbanned by admin/moderator: ${req.params.id}`);
    res.json({ message: 'User unbanned successfully', user });
  } catch (error) {
    logger.error(`Failed to unban user by admin/moderator: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers, deleteUser, banUser, unbanUser };