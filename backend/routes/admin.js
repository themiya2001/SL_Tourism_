const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');
const Destination = require('../models/Destination');
const Attraction = require('../models/Attraction');
const Hotel = require('../models/Hotel');
const Event = require('../models/Event');
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');

// Apply authentication and admin middleware to all routes
router.use(protect);
router.use(admin);

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Admin only
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalUsers,
      totalDestinations,
      totalAttractions,
      totalHotels,
      totalEvents,
      totalContacts,
      totalNewsletterSubscribers,
      recentUsers,
      recentContacts
    ] = await Promise.all([
      User.countDocuments(),
      Destination.countDocuments(),
      Attraction.countDocuments(),
      Hotel.countDocuments(),
      Event.countDocuments(),
      Contact.countDocuments(),
      Newsletter.countDocuments(),
      User.find().sort({ createdAt: -1 }).limit(5),
      Contact.find().sort({ submittedAt: -1 }).limit(5)
    ]);

    // Get monthly user registrations for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyUsers = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json({
      statistics: {
        totalUsers,
        totalDestinations,
        totalAttractions,
        totalHotels,
        totalEvents,
        totalContacts,
        totalNewsletterSubscribers
      },
      recentUsers,
      recentContacts,
      monthlyUsers
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users with pagination
// @access  Admin only
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const role = req.query.role || '';

    const skip = (page - 1) * limit;

    let query = {};
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      query.role = role;
    }

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(query)
    ]);

    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user (admin only)
// @access  Admin only
router.put('/users/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, role, isActive, phone, country } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (role) user.role = role;
    if (typeof isActive === 'boolean') user.isActive = isActive;
    if (phone !== undefined) user.phone = phone;
    if (country !== undefined) user.country = country;

    const updatedUser = await user.save();

    res.json({
      message: 'User updated successfully',
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
        isActive: updatedUser.isActive,
        phone: updatedUser.phone,
        country: updatedUser.country,
        createdAt: updatedUser.createdAt
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error during user update' });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user (admin only)
// @access  Admin only
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error during user deletion' });
  }
});

// @route   GET /api/admin/contacts
// @desc    Get all contact submissions with pagination
// @access  Admin only
router.get('/contacts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const skip = (page - 1) * limit;

    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit),
      Contact.countDocuments(query)
    ]);

    res.json({
      contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalContacts: total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/contacts/:id
// @desc    Delete contact submission
// @access  Admin only
router.delete('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Server error during contact deletion' });
  }
});

// @route   GET /api/admin/newsletter
// @desc    Get all newsletter subscribers
// @access  Admin only
router.get('/newsletter', async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json({ subscribers });
  } catch (error) {
    console.error('Get newsletter subscribers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/newsletter/:id
// @desc    Remove newsletter subscriber
// @access  Admin only
router.delete('/newsletter/:id', async (req, res) => {
  try {
    const subscriber = await Newsletter.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    await Newsletter.findByIdAndDelete(req.params.id);

    res.json({ message: 'Subscriber removed successfully' });
  } catch (error) {
    console.error('Remove subscriber error:', error);
    res.status(500).json({ message: 'Server error during subscriber removal' });
  }
});

module.exports = router; 