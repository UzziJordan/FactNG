const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
const allowedOrigins = [
  'https://factng.onrender.com',
  'https://fact-ng.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// admin Routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// project Routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

// expert Routes
const expertRoutes = require('./routes/expertRoutes');
app.use('/api/experts', expertRoutes);

// contact Routes
const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contacts', contactRoutes);

// story Routes
const storyRoutes = require('./routes/storyRoutes');
app.use('/api/story', storyRoutes);

// social Routes
const socialLinkRoutes = require('./routes/socialLinkRoutes');
app.use('/api/social-links', socialLinkRoutes);

// office Routes
const officeRoutes = require('./routes/officeRoutes');
app.use('/api/offices', officeRoutes);

// company info Routes
const companyRoutes = require('./routes/companyRoutes');
app.use('/api/company-info', companyRoutes);

//test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Error Handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

//export app for server.js
module.exports = app;