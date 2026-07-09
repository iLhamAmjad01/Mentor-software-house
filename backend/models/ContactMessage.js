const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema(
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
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      default: 'General Inquiry',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Read', 'Replied'],
      default: 'Pending',
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

ContactMessageSchema.index({ email: 1 });
ContactMessageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
