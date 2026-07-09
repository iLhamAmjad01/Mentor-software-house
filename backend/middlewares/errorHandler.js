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

  console.error(`[Error Handler Exception] ${err.stack || err.message}`);

  // 1. Handle Multer / File Upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      errorType: 'UploadFailed',
      message: 'Upload failed: File size limit exceeded. Resumes must be smaller than 10MB.',
    });
  }
  if (err.message && err.message.includes('Only PDF files are allowed')) {
    return res.status(400).json({
      success: false,
      errorType: 'UploadFailed',
      message: `Upload failed: ${err.message}`,
    });
  }

  // 2. Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      errorType: 'ValidationFailed',
      message: 'Validation failed',
      errors: Object.values(err.errors).map(val => ({ field: val.path, message: val.message })),
    });
  }

  // 3. Handle MongoDB / Connection errors
  if (
    err.name === 'MongoError' || 
    err.name === 'MongoServerError' || 
    err.message.includes('MongooseError') || 
    err.message.includes('MongoNetworkError') || 
    err.message.includes('connect ECONNREFUSED')
  ) {
    return res.status(503).json({
      success: false,
      errorType: 'DatabaseFailed',
      message: 'Database failed: Connection or transaction failed. Please try again later.',
    });
  }

  // 4. Default Express Server error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    errorType: 'ServerError',
    message: err.message || 'An unexpected server error occurred.',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
