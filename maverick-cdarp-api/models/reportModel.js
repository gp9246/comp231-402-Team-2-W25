// models/reportModel.js: Accessibility report data model
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  websiteUrl: { type: String, required: true },
  accessibilityScore: { type: Number, required: true },
  reportDetails: { type: Object, required: true }, // Store detailed report data
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  flagged: { type: Boolean, default: false },
});

module.exports = mongoose.model('Report', reportSchema);