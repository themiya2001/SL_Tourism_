const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const { protect, admin } = require('../middleware/auth');

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ name: 1 });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get hotels by location
router.get('/location/:location', async (req, res) => {
  try {
    const hotels = await Hotel.find({ 
      location: { $regex: req.params.location, $options: 'i' } 
    }).sort({ name: 1 });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get hotels by star rating
router.get('/rating/:rating', async (req, res) => {
  try {
    const rating = parseInt(req.params.rating);
    const hotels = await Hotel.find({ starRating: rating }).sort({ name: 1 });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get hotels by price range
router.get('/price/:min/:max', async (req, res) => {
  try {
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);
    const hotels = await Hotel.find({
      priceRange: { $gte: min, $lte: max }
    }).sort({ priceRange: 1 });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search hotels
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const hotels = await Hotel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        { amenities: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new hotel (Admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    const saved = await hotel.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a hotel (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updated = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a hotel (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const existing = await Hotel.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get hotel by ID (keep last to avoid route conflict)
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
