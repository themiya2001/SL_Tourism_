const mongoose = require('mongoose');
require('dotenv').config();

const Hotel = require('../models/Hotel');
const Event = require('../models/Event');
const Attraction = require('../models/Attraction');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:2EjROitKQQOM8dOo@cluster0.r5ikkfl.mongodb.net', {
    dbName: process.env.MONGODB_DB || 'test',
    });

    console.log('Connected to MongoDB');

    const hotels = [
      {
        name: 'Cinnamon Grand Colombo',
        description: 'Luxury hotel in the heart of Colombo with world-class amenities and service.',
        location: 'Colombo',
        starRating: 5,
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80'],
        mainImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
        priceRange: 25000,
        amenities: ['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant'],
        contactInfo: { phone: '+94 11 243 7437', email: 'info@cinnamongrand.com', website: 'https://www.cinnamonhotels.com' },
        rating: 4.8,
        featured: true
      },
      {
        name: 'Heritance Kandalama',
        description: 'Eco-friendly luxury hotel overlooking the Sigiriya Rock Fortress.',
        location: 'Dambulla',
        starRating: 5,
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'],
        mainImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        priceRange: 35000,
        amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Airport Transfer'],
        contactInfo: { phone: '+94 66 555 5000', email: 'info@heritancehotels.com', website: 'https://www.heritancehotels.com' },
        rating: 4.6,
        featured: true
      }
    ];

    const events = [
      {
        name: 'Kandy Esala Perahera',
        description: 'Grand cultural festival held annually in Kandy with traditional dancers and decorated elephants.',
        location: 'Kandy',
        category: 'Cultural',
        startDate: new Date('2025-07-15'),
        endDate: new Date('2025-07-25'),
        images: ['/images/perahera1.jpg'],
        mainImage: '/images/perahera1.jpg',
        ticketInfo: { price: 5000, currency: 'LKR', available: true },
        highlights: ['Traditional dances', 'Elephant parade'],
        featured: true
      },
      {
        name: 'Galle Literary Festival',
        description: 'Celebration of literature featuring renowned authors, workshops, and discussions.',
        location: 'Galle',
        category: 'Cultural',
        startDate: new Date('2025-01-25'),
        endDate: new Date('2025-01-28'),
        images: ['/images/galle.jpg'],
        mainImage: '/images/galle.jpg',
        ticketInfo: { price: 15000, currency: 'LKR', available: true },
        featured: true
      }
    ];

    const attractions = [
      {
        name: 'Temple of the Sacred Tooth Relic',
        description: 'Buddhist temple in Kandy housing the sacred tooth relic of the Buddha.',
        location: 'Kandy',
        type: 'Temple',
        images: ['/images/maligawa.jpg'],
        mainImage: '/images/maligawa.jpg',
        openingHours: { open: '05:30', close: '20:00', daysOpen: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
        entryFee: { local: 1000, foreign: 2000, currency: 'LKR' },
        rating: 4.7,
        featured: true
      },
      {
        name: 'National Museum of Colombo',
        description: 'Largest museum in Sri Lanka showcasing cultural and natural heritage.',
        location: 'Colombo',
        type: 'Museum',
        images: ['/images/colombo.jpg'],
        mainImage: '/images/colombo.jpg',
        openingHours: { open: '09:00', close: '17:00', daysOpen: ['Tue','Wed','Thu','Fri','Sat','Sun'] },
        entryFee: { local: 500, foreign: 1000, currency: 'LKR' },
        rating: 4.3,
        featured: true
      }
    ];

    await Promise.all([
      Hotel.deleteMany({}),
      Event.deleteMany({}),
      Attraction.deleteMany({})
    ]);

    console.log('Cleared existing content');

    await Hotel.insertMany(hotels);
    await Event.insertMany(events);
    await Attraction.insertMany(attractions);

    console.log('Seeded hotels, events, and attractions');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seed();


