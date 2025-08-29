const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Cultural', 'Religious', 'Music', 'Food', 'Sports', 'Art', 'Festival', 'Conference', 'Other']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  images: [{
    type: String
  }],
  mainImage: {
    type: String
  },
  organizer: {
    name: String,
    contact: String,
    website: String
  },
  ticketInfo: {
    price: Number,
    currency: {
      type: String,
      default: 'LKR'
    },
    available: {
      type: Boolean,
      default: true
    },
    bookingUrl: String
  },
  highlights: [{
    type: String
  }],
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for checking if event is upcoming
eventSchema.virtual('isUpcoming').get(function() {
  return this.startDate > new Date();
});

// Virtual for checking if event is ongoing
eventSchema.virtual('isOngoing').get(function() {
  const now = new Date();
  return this.startDate <= now && this.endDate >= now;
});

module.exports = mongoose.model('Event', eventSchema); 