// services/reportService.js: Report services
const Report = require('../models/reportModel');
const logger = require('../utils/logger');

const submitReport = async (userId, websiteUrl, accessibilityScore, reportDetails) => {
  try {
    const report = new Report({ userId, websiteUrl, accessibilityScore, reportDetails });
    await report.save();
    logger.info(`Report submitted: ${report._id} (User: ${userId}, URL: ${websiteUrl})`);
    return report;
  } catch (error) {
    logger.error(`Report submission failed: ${error.message}`);
    throw error;
  }
};

const getReports = async (filter = {}) => {
  try {
    const reports = await Report.find(filter).populate('userId', 'username email');
    logger.info(`Reports retrieved (filtered): ${JSON.stringify(filter)}`);
    return reports;
  } catch (error) {
    logger.error(`Failed to retrieve reports (filtered): ${error.message}`);
    throw error;
  }
};

const getAllReports = async () => {
  try {
    const reports = await Report.find().populate('userId', 'username email');
    logger.info('All reports retrieved.');
    return reports;
  } catch (error) {
    logger.error(`Failed to retrieve all reports: ${error.message}`);
    throw error;
  }
};

const deleteReport = async (reportId) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(reportId);
    if(deletedReport){
        logger.info(`Report deleted: ${reportId}`);
        return deletedReport;
    } else {
        logger.warn(`Report not found for deletion: ${reportId}`);
        return null;
    }

  } catch (error) {
    logger.error(`Failed to delete report: ${error.message}`);
    throw error;
  }
};

const getPublicReports = async (filter = {}) => {
  try {
    const reports = await Report.find(filter).populate('userId', 'username');
    logger.info(`Public reports retrieved (filtered): ${JSON.stringify(filter)}`);
    return reports;
  } catch (error) {
    logger.error(`Failed to retrieve public reports (filtered): ${error.message}`);
    throw error;
  }
};

const flagReport = async (reportId) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(reportId, { flagged: true }, { new: true });
    logger.info(`Report flagged: ${reportId}`);
    return updatedReport;
  } catch (error) {
    logger.error(`Failed to flag report: ${error.message}`);
    throw error;
  }
};

const getFlaggedReports = async () => {
  try {
    const reports = await Report.find({ flagged: true }).populate('userId', 'username email');
    logger.info('Flagged reports retrieved.');
    return reports;
  } catch (error) {
    logger.error(`Failed to retrieve flagged reports: ${error.message}`);
    throw error;
  }
};

const unflagReport = async (reportId) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(reportId, { flagged: false }, { new: true });
    logger.info(`Report unflagged: ${reportId}`);
    return updatedReport;
  } catch (error) {
    logger.error(`Failed to unflag report: ${error.message}`);
    throw error;
  }
};

module.exports = {
  submitReport,
  getReports,
  flagReport,
  getAllReports,
  deleteReport,
  getPublicReports,
  getFlaggedReports,
  unflagReport,
};