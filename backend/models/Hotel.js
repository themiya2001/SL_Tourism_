const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
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
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  images: [{
    type: String,
    required: true
  }],
  mainImage: {
    type: String,
    required: true
  },
  priceRange: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: [{
    type: String
  }],
  roomTypes: [{
    name: String,
    description: String,
    price: Number,
    capacity: Number
  }],
  contactInfo: {
    phone: String,
    email: String,
    website: String,
    address: String
  },
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
  facilities: {
    wifi: {
      type: Boolean,
      default: false
    },
    pool: {
      type: Boolean,
      default: false
    },
    spa: {
      type: Boolean,
      default: false
    },
    restaurant: {
      type: Boolean,
      default: false
    },
    gym: {
      type: Boolean,
      default: false
    },
    parking: {
      type: Boolean,
      default: false
    },
    airportTransfer: {
      type: Boolean,
      default: false
    }
  },
  policies: {
    checkIn: String,
    checkOut: String,
    cancellation: String
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

hotelSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Hotel', hotelSchema); 