const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// @route   POST /api/contact
// @desc    Submit contact form
router.post(
  '/',
  [
    body('name')
      .trim()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long'),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address'),
    body('subject')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Subject must be at least 5 characters long'),
    body('message')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Message must be at least 10 characters long'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Please check your input and try again',
        });
      }

      const { name, email, subject, message, phone } = req.body;

      const contact = new Contact({
        name,
        email,
        subject,
        message,
        phone: phone || '',
        submittedAt: new Date(),
      });

      await contact.save();

      res.status(201).json({
        message: 'Thank you for your message! We will get back to you soon.',
        contact: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          submittedAt: contact.submittedAt,
        },
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        message: 'Failed to submit contact form. Please try again later.',
      });
    }
  }
);

// @route   GET /api/contact
// @desc    Get all contact submissions (Admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/contact/:id
// @desc    Get a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
