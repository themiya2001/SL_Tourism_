# 🌴 Sri Lanka Tourism Website

A modern, responsive tourism website for Sri Lanka featuring beautiful design, interactive components, and comprehensive information about destinations, attractions, hotels, and events.

## ✨ Features

### Frontend (React)
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **User Authentication**: Complete login/signup system with JWT tokens
- **Admin Dashboard**: Secure admin panel with user management and analytics
- **Interactive Components**: Framer Motion animations and modern React patterns
- **Comprehensive Pages**: Home, Destinations, Attractions, Hotels, Events, About, Contact
- **Search & Filter**: Advanced search and filtering capabilities
- **Responsive Design**: Mobile-first approach with excellent cross-device compatibility
- **Performance Optimized**: Fast loading times and smooth user experience

### Backend (Node.js/Express)
- **RESTful API**: Complete API for all tourism data
- **Authentication System**: JWT-based authentication with role-based access control
- **Admin Management**: Comprehensive admin API for user and content management
- **MongoDB Integration**: Robust database with comprehensive data models
- **Security**: Input validation, CORS, security headers, and password hashing
- **Scalable Architecture**: Modular design for easy maintenance and scaling
- **Contact Forms**: Newsletter subscription and contact form handling

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SriLankaSite
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   ```bash
   # In backend directory
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/sri-lanka-tourism
   FRONTEND_URL=http://localhost:3000
   ```

5. **Create Admin User (Optional)**
   ```bash
   cd backend
   npm run create-admin
   ```
   This creates a default admin user:
   - Email: admin@srilanka.com
   - Password: admin123

6. **Start the Development Servers**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm start
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Login: http://localhost:3000/admin/login

## 📁 Project Structure

```
SriLankaSite/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── ...
│   │   ├── App.js           # Main app component
│   │   ├── App.css          # Global styles
│   │   └── index.js         # Entry point
│   └── package.json
├── backend/                  # Node.js backend application
│   ├── models/              # MongoDB models
│   │   ├── Destination.js
│   │   ├── Attraction.js
│   │   ├── Hotel.js
│   │   ├── Event.js
│   │   ├── Contact.js
│   │   └── Newsletter.js
│   ├── routes/              # API routes
│   │   ├── destinations.js
│   │   ├── attractions.js
│   │   ├── hotels.js
│   │   ├── events.js
│   │   ├── contact.js
│   │   └── newsletter.js
│   ├── index.js             # Server entry point
│   ├── env.example          # Environment variables template
│   └── package.json
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- **React 19** - Modern React with latest features
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **React Intersection Observer** - Scroll-based animations
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 📱 Pages & Features

### Home Page
- Hero section with call-to-action
- Featured destinations showcase
- Statistics and key highlights
- Why choose Sri Lanka section
- Newsletter signup

### Destinations
- Comprehensive destination listings
- Category-based filtering
- Search functionality
- Detailed destination pages
- Image galleries

### Attractions
- Tourist attraction listings
- Type-based categorization
- Location-based filtering
- Opening hours and entry fees
- Accessibility information

### Hotels
- Hotel listings with ratings
- Price range filtering
- Star rating system
- Amenities and facilities
- Booking information

### Events
- Upcoming events calendar
- Event categories
- Location-based filtering
- Ticket information
- Event details

### About
- Organization information
- Mission and vision
- Team profiles
- Awards and recognition
- Values and principles

### Contact
- Contact form with validation
- Office information
- Emergency contacts
- Interactive map placeholder
- FAQ section

## 🔧 API Endpoints

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get specific destination
- `GET /api/destinations/category/:category` - Filter by category
- `GET /api/destinations/search/:query` - Search destinations

### Attractions
- `GET /api/attractions` - Get all attractions
- `GET /api/attractions/:id` - Get specific attraction
- `GET /api/attractions/type/:type` - Filter by type
- `GET /api/attractions/location/:location` - Filter by location

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get specific hotel
- `GET /api/hotels/location/:location` - Filter by location
- `GET /api/hotels/rating/:rating` - Filter by star rating

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get specific event
- `GET /api/events/upcoming/events` - Get upcoming events
- `GET /api/events/category/:category` - Filter by category

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change user password

### Admin Management
- `GET /api/admin/dashboard` - Get admin dashboard statistics
- `GET /api/admin/users` - Get all users with pagination
- `PUT /api/admin/users/:id` - Update user (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)
- `GET /api/admin/contacts` - Get all contact submissions
- `DELETE /api/admin/contacts/:id` - Delete contact submission
- `GET /api/admin/newsletter` - Get all newsletter subscribers
- `DELETE /api/admin/newsletter/:id` - Remove newsletter subscriber

### Contact & Newsletter
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter

## 🎨 Design Features

- **Modern Color Scheme**: Purple gradient theme (#667eea to #764ba2)
- **Responsive Grid System**: CSS Grid for flexible layouts
- **Smooth Animations**: Framer Motion for engaging interactions
- **Card-based Design**: Clean, modern card layouts
- **Typography**: Inter font family for excellent readability
- **Icon Integration**: Lucide React icons throughout
- **Loading States**: Spinner animations and skeleton screens

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting platform

### Backend Deployment (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the backend directory
3. Update frontend API URLs to point to production backend

### Database Setup
- Use MongoDB Atlas for cloud database
- Set up proper indexes for performance
- Configure backup and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Sri Lanka Tourism Development Authority for inspiration
- Unsplash for beautiful images
- The React and Node.js communities for excellent tools and libraries

## 📞 Support

For support and questions:
- Email: info@srilankatourism.com
- Phone: +94 11 234 5678
- Website: https://srilankatourism.com

---

**Made with ❤️ for Sri Lanka Tourism** 