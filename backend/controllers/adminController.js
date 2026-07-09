const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const InternshipApplication = require('../models/InternshipApplication');

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'mentortechsecretjwt123', {
    expiresIn: '7d', // 7 days validity
  });
};

/**
 * Admin Login
 * POST /api/admin/login
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    // Find admin by username
    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Send token response
    res.json({
      success: true,
      token: generateToken(admin._id),
      username: admin.username,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Dashboard Statistics
 * GET /api/admin/stats
 */
const getStats = async (req, res, next) => {
  try {
    const [total, pending, reviewed, accepted, rejected] = await Promise.all([
      InternshipApplication.countDocuments(),
      InternshipApplication.countDocuments({ status: 'Pending' }),
      InternshipApplication.countDocuments({ status: 'Reviewed' }),
      InternshipApplication.countDocuments({ status: 'Accepted' }),
      InternshipApplication.countDocuments({ status: 'Rejected' }),
    ]);

    res.json({
      success: true,
      stats: {
        total,
        pending,
        reviewed,
        accepted,
        rejected,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Paginated/Filtered Applications List
 * GET /api/admin/applications
 */
const getApplications = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      position = '',
      status = '',
      internshipType = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const query = {};

    // Apply Search
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { university: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    // Apply Filters
    if (position) query.position = position;
    if (status) query.status = status;
    if (internshipType) query.internshipType = internshipType;

    // Apply Sorting
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Apply Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute queries
    const applications = await InternshipApplication.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await InternshipApplication.countDocuments(query);

    res.json({
      success: true,
      data: applications,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Specific Application Details
 * GET /api/admin/application/:id
 */
const getApplicationById = async (req, res, next) => {
  try {
    const application = await InternshipApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

/**
 * Update Application (Status / Notes)
 * PATCH /api/admin/application/:id
 */
const updateApplication = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const application = await InternshipApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (status) {
      if (!['Pending', 'Reviewed', 'Accepted', 'Rejected'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value' });
      }
      application.status = status;
    }

    if (notes !== undefined) {
      application.notes = notes;
    }

    await application.save();

    res.json({
      success: true,
      message: 'Application updated successfully',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Application (Removes DB record and cleans up PDF)
 * DELETE /api/admin/application/:id
 */
const deleteApplication = async (req, res, next) => {
  try {
    const application = await InternshipApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Delete PDF from disk
    const filePath = path.join(__dirname, '../uploads/cv', application.resume);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from DB
    await InternshipApplication.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Application and associated resume deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Secure CV Download
 * GET /api/admin/download-cv/:id
 */
const downloadCv = async (req, res, next) => {
  try {
    const application = await InternshipApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const filePath = path.join(__dirname, '../uploads/cv', application.resume);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Resume file not found on disk' });
    }

    res.download(filePath, application.resumeOriginalName);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getStats,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  downloadCv,
};
