const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  name: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: {
    type: Date
  },
  lastEmailSent: {
    type: Date
  },
  preferences: {
    weekly: {
      type: Boolean,
      default: true
    },
    monthly: {
      type: Boolean,
      default: true
    },
    specialOffers: {
      type: Boolean,
      default: true
    }
  }
});

module.exports = mongoose.model('Newsletter', newsletterSchema); 