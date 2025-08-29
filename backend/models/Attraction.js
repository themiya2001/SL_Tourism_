const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
    enum: ['Temple', 'Museum', 'Park', 'Beach', 'Mountain', 'Waterfall', 'Fort', 'Palace', 'Garden', 'Other']
  },
  images: [{
    type: String,
    required: true
  }],
  mainImage: {
    type: String,
    required: true
  },
  openingHours: {
    open: String,
    close: String,
    daysOpen: [String]
  },
  entryFee: {
    local: Number,
    foreign: Number,
    currency: {
      type: String,
      default: 'LKR'
    }
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  facilities: [{
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
  accessibility: {
    wheelchair: {
      type: Boolean,
      default: false
    },
    parking: {
      type: Boolean,
      default: false
    },
    publicTransport: {
      type: Boolean,
      default: false
    }
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

attractionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Attraction', attractionSchema); 