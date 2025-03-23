// controllers/reportController.js: Report submission and retrieval logic
const reportService = require('../services/reportService');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

const submitReport = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Report submission validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { websiteUrl, accessibilityScore, reportDetails } = req.body;
    const report = await reportService.submitReport(req.user.userId, websiteUrl, accessibilityScore, reportDetails);
    logger.info(`Report submitted: ${report._id} (User: ${req.user.userId}, URL: ${websiteUrl})`);
    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (error) {
    logger.error(`Report submission failed: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await reportService.getReports(req.query);
    logger.info(`Reports retrieved (filtered): ${JSON.stringify(req.query)}`);
    res.json(reports);
  } catch (error) {
    logger.error(`Failed to retrieve reports (filtered): ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const flagReport = async (req, res) => {
  try {
    const report = await reportService.flagReport(req.params.id);
    logger.info(`Report flagged: ${req.params.id}`);
    res.json({ message: 'Report flagged successfully', report });
  } catch (error) {
    logger.error(`Failed to flag report: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await reportService.getAllReports();
    logger.info('All reports retrieved.');
    res.json(reports);
  } catch (error) {
    logger.error(`Failed to retrieve all reports: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const deleteReport = async (req, res) => {
  try {
    await reportService.deleteReport(req.params.id);
    logger.info(`Report deleted: ${req.params.id}`);
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    logger.error(`Failed to delete report: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getPublicReports = async (req, res) => {
  try {
    const reports = await reportService.getPublicReports(req.query);
    logger.info(`Public reports retrieved (filtered): ${JSON.stringify(req.query)}`);
    res.json(reports);
  } catch (error) {
    logger.error(`Failed to retrieve public reports (filtered): ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const getFlaggedReports = async (req, res) => {
  try {
    const reports = await reportService.getFlaggedReports();
    logger.info('Flagged reports retrieved.');
    res.json(reports);
  } catch (error) {
    logger.error(`Failed to retrieve flagged reports: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const unflagReport = async (req, res) => {
  try {
    const report = await reportService.unflagReport(req.params.id);
    logger.info(`Report unflagged: ${req.params.id}`);
    res.json({ message: 'Report unflagged successfully', report });
  } catch (error) {
    logger.error(`Failed to unflag report: ${error.message}`);
    res.status(500).json({ error: error.message });
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