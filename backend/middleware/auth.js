const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes - requires a valid JWT token
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

      // Find user by ID from token, exclude password field
      req.user = await User.findById(decoded.id).select('-password');

      // If user not found or inactive, deny access
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      if (!req.user.isActive) {
        return res.status(401).json({ message: 'Account is deactivated' });
      }

      // User is authenticated, proceed
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to allow access only to admins
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

// Optional authentication middleware:
// If token provided and valid, attach user to req; otherwise continue without user.
const optionalAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Invalid token - do NOT block request, just log
      console.error('Optional auth error:', error);
    }
  }

  next();
};

module.exports = { protect, admin, optionalAuth };
