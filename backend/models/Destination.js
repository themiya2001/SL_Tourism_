const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
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
    enum: ['Beach', 'Mountain', 'Cultural', 'Wildlife', 'Adventure', 'Historical', 'Religious', 'City']
  },
  images: [{
    type: String,
    required: true
  }],
  mainImage: {
    type: String,
    required: true
  },
  highlights: [{
    type: String
  }],
  bestTimeToVisit: {
    type: String
  },
  howToReach: {
    type: String
  },
  accommodation: {
    type: String
  },
  activities: [{
    type: String
  }],
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

destinationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Destination', destinationSchema); 