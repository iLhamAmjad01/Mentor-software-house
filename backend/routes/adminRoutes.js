const express = require('express');
const { loginLimiter } = require('../middlewares/rateLimiter');
const { protect } = require('../middlewares/authMiddleware');
const {
  login,
  getStats,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  downloadCv,
} = require('../controllers/adminController');

const router = express.Router();

// Admin login route (public but rate-limited)
router.post('/login', loginLimiter, login);

// Protected routes (require JWT verification)
router.get('/stats', protect, getStats);
router.get('/applications', protect, getApplications);
router.get('/application/:id', protect, getApplicationById);
router.patch('/application/:id', protect, updateApplication);
router.delete('/application/:id', protect, deleteApplication);
router.get('/download-cv/:id', protect, downloadCv);

module.exports = router;
