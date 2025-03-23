// config/env.js: Environment variables
require('dotenv').config();

process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/accessibilityDB';
process.env.PORT = process.env.PORT || 3000;
process.env.JWT_SECRET = process.env.JWT_SECRET || '#SzKx"`A1$jm[0j~5SIj%81BREr1hn3dTCwGw$Qtc|8Xps9{A/S99+S#c*_j>ZyG';