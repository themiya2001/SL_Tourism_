const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Replied', 'Closed'],
    default: 'New'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  repliedAt: {
    type: Date
  },
  adminNotes: {
    type: String
  }
});

module.exports = mongoose.model('Contact', contactSchema); 