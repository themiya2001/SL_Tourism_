const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Newsletter = require('../models/Newsletter');

// Subscribe to newsletter
router.post('/subscribe', [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        errors: errors.array(),
        message: 'Please check your input and try again'
      });
    }

    const { email, name } = req.body;

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ 
        message: 'This email is already subscribed to our newsletter' 
      });
    }

    const newsletter = new Newsletter({
      email,
      name: name || '',
      subscribedAt: new Date(),
      isActive: true
    });

    await newsletter.save();

    res.status(201).json({
      message: 'Successfully subscribed to our newsletter!',
      subscription: {
        id: newsletter._id,
        email: newsletter.email,
        name: newsletter.name,
        subscribedAt: newsletter.subscribedAt
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      message: 'Failed to subscribe to newsletter. Please try again later.' 
    });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', [
  body('email').isEmail().withMessage('Please provide a valid email address')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        errors: errors.array(),
        message: 'Please check your input and try again'
      });
    }

    const { email } = req.body;

    const subscription = await Newsletter.findOne({ email });
    if (!subscription) {
      return res.status(404).json({ 
        message: 'Email not found in our newsletter subscriptions' 
      });
    }

    subscription.isActive = false;
    subscription.unsubscribedAt = new Date();
    await subscription.save();

    res.json({
      message: 'Successfully unsubscribed from our newsletter'
    });

  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(500).json({ 
      message: 'Failed to unsubscribe from newsletter. Please try again later.' 
    });
  }
});

// Get all newsletter subscriptions (admin only)
router.get('/subscriptions', async (req, res) => {
  try {
    const subscriptions = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get active subscriptions count
router.get('/count', async (req, res) => {
  try {
    const count = await Newsletter.countDocuments({ isActive: true });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 