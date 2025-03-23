// services/userService.js: User services
const User = require('../models/userModel');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');

const getAllUsers = async () => {
  try {
    const users = await User.find().select('-password');
    logger.info('All users retrieved.');
    return users;
  } catch (error) {
    logger.error(`Failed to retrieve all users: ${error.message}`);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if(deletedUser){
        logger.info(`User deleted: ${userId}`);
        return deletedUser;
    } else {
        logger.warn(`User not found for deletion: ${userId}`);
        return null;
    }

  } catch (error) {
    logger.error(`Failed to delete user: ${error.message}`);
    throw error;
  }
};

const banUser = async (userId) => {
  try {
    const bannedUser = await User.findByIdAndUpdate(userId, { banned: true }, { new: true }).select('-password');
    logger.info(`User banned: ${userId}`);
    return bannedUser;
  } catch (error) {
    logger.error(`Failed to ban user: ${error.message}`);
    throw error;
  }
};

const unbanUser = async (userId) => {
  try {
    const unbannedUser = await User.findByIdAndUpdate(userId, { banned: false }, { new: true }).select('-password');
    logger.info(`User unbanned: ${userId}`);
    return unbannedUser;
  } catch (error) {
    logger.error(`Failed to unban user: ${error.message}`);
    throw error;
  }
};

const updateSettings = async (userId, settings) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { settings }, { new: true }).select('-password');
    logger.info(`Settings updated for user: ${userId}`);
    return updatedUser;
  } catch (error) {
    logger.error(`Failed to update settings for user: ${error.message}`);
    throw error;
  }
};

const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid old password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    logger.info(`Password changed for user: ${userId}`);
    return { message: 'Password changed successfully' };
  } catch (error) {
    logger.error(`Failed to change password for user: ${error.message}`);
    throw error;
  }
};

module.exports = { getAllUsers, deleteUser, banUser, unbanUser, updateSettings, changePassword };