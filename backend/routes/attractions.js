const express = require('express');
const router = express.Router();
const Attraction = require('../models/Attraction');
const { protect, admin } = require('../middleware/auth');

// Get all attractions
router.get('/', async (req, res) => {
  try {
    const attractions = await Attraction.find().sort({ name: 1 });
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get attractions by type
router.get('/type/:type', async (req, res) => {
  try {
    const attractions = await Attraction.find({ 
      type: req.params.type 
    }).sort({ name: 1 });
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get attractions by location
router.get('/location/:location', async (req, res) => {
  try {
    const attractions = await Attraction.find({ 
      location: { $regex: req.params.location, $options: 'i' } 
    }).sort({ name: 1 });
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search attractions
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const attractions = await Attraction.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        { type: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create attraction (Admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const attraction = new Attraction(req.body);
    const saved = await attraction.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update attraction (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updated = await Attraction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Attraction not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete attraction (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const existing = await Attraction.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Attraction not found' });
    }
    await Attraction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Attraction deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get attraction by ID (must be last to avoid route conflicts)
router.get('/:id', async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id);
    if (!attraction) {
      return res.status(404).json({ message: 'Attraction not found' });
    }
    res.json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
