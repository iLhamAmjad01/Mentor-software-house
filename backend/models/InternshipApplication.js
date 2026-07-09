const mongoose = require('mongoose');

const InternshipApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    cnic: {
      type: String,
      trim: true,
    },
    university: {
      type: String,
      required: [true, 'University is required'],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true,
    },
    semester: {
      type: String,
      trim: true,
    },
    graduationYear: {
      type: Number,
    },
    cgpa: {
      type: Number,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    internshipType: {
      type: String,
      trim: true,
    },
    skills: {
      type: String,
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    portfolio: {
      type: String,
      trim: true,
    },
    coverLetter: {
      type: String,
      trim: true,
    },
    whyJoin: {
      type: String,
      trim: true,
    },
    availableDate: {
      type: Date,
    },
    resume: {
      type: String,
      required: [true, 'Resume filename is required'],
    },
    resumeOriginalName: {
      type: String,
    },
    resumeSize: {
      type: Number,
    },
    resumeMimeType: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
    notes: {
      type: String,
      default: '',
    },
    ipAddress: {
      type: String,
    },
    browser: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Index on email and status for faster lookups
InternshipApplicationSchema.index({ email: 1 });
InternshipApplicationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('InternshipApplication', InternshipApplicationSchema);
