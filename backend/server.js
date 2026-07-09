require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const { apiLimiter } = require('./middlewares/rateLimiter');
const { transporter } = require('./config/nodemailer');

// Import routes
const internshipRoutes = require('./routes/internshipRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Handle uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (err) => {
  console.error(`>>> [CRITICAL] Uncaught Exception: ${err.message}`);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('>>> [CRITICAL] Unhandled Rejection at:', promise, 'reason:', reason);
});

// Audit required environment variables
const requiredEnvVars = ['MONGODB_URI', 'SMTP_USER', 'SMTP_PASS'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.error(`>>> [ENV WARNING] Missing critical environment variables: ${missingVars.join(', ')}`);
  console.error('>>> Ensure these environment variables are set in your Render dashboard or local .env file.');
} else {
  console.log('>>> [ENV AUDIT] All critical environment variables are loaded.');
}

// Initialize database
connectDB().then(() => {
  // Seed admin user
  seedAdmin();
  
  // Verify SMTP Transporter
  console.log('>>> [Nodemailer] Verifying SMTP Connection...');
  transporter.verify((error, success) => {
    if (error) {
      console.error('>>> [Nodemailer] SMTP Transporter Verification FAILED:', error.message);
      console.error('>>> Please check SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS settings.');
    } else {
      console.log('>>> [Nodemailer] SMTP Transporter is ready to deliver messages.');
    }
  });
});

const app = express();

// Trust reverse proxy (Render) to correctly resolve rate limits and client IPs
app.set('trust proxy', 1);

// Security and utility Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false, // Allows cross-origin file downloads if frontend is hosted separately
  contentSecurityPolicy: false,     // Disabled to prevent Chrome DevTools and browser extensions warning alerts
}));

const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, '../frontend')));

// Apply general API rate limiter to all api routes
app.use('/api', apiLimiter);

// Register Routes
app.use('/api/internships', internshipRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Route for serving index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'up', timestamp: new Date() });
});

// Central Error Handler
app.use(errorHandler);

// Port setup
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Seeder function for Admin Account
async function seedAdmin() {
  try {
    const Admin = require('./models/Admin');
    const count = await Admin.countDocuments();
    if (count === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      
      const seed = new Admin({ username, password });
      await seed.save();
      console.log(`>>> [Seeder] Admin collection was empty. Seeded default account:`);
      console.log(`>>> Username: ${username}`);
      console.log(`>>> Password: ${password === 'admin123' ? 'admin123 (Please change this in production!)' : '******'}`);
    }
  } catch (error) {
    console.error('Failed to seed admin account:', error.message);
  }
}

module.exports = { app, server };
