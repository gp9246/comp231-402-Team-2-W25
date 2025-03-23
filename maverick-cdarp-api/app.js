// app.js: Main application file
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const bodyParser = require('body-parser');

const connectDB = require('./config/database');
const { verifyToken } = require('./middlewares/authMiddleware');
const logger = require('./utils/logger');
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const { handleError } = require('./utils/errorHandling');

require('dotenv').config();

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml')); // Load your swagger.yaml file


connectDB();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/reports', reportRoutes);
app.use('/users', userRoutes);
app.use('/settings', settingsRoutes);
app.use('/admin', adminRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((err, req, res, next) => {
  handleError(res, err);
});

// Protected route for testing purposes
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected route accessed', user: req.user });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});