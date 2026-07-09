const fs = require('fs');

const errorHandler = (err, req, res, next) => {
  // Delete uploaded file if it exists to avoid orphan files on server error
  if (req.file && req.file.path) {
    fs.unlink(req.file.path, (unlinkErr) => {
      if (unlinkErr) {
        console.error(`Failed to delete file at ${req.file.path} on error:`, unlinkErr);
      } else {
        console.log(`Successfully cleaned up uploaded file: ${req.file.filename}`);
      }
    });
  }

  // Handle multer errors specifically
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size limit exceeded. Resumes must be smaller than 10MB.',
    });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  console.error(`[Error Handler] ${err.stack || err.message}`);
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected server error occurred.',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
