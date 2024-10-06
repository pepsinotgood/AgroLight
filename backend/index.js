// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const environmentalRoutes = require('./routes/environmental'); // Import your routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Use the environmental routes
app.use('/api/environmental', environmentalRoutes); // Set up the route

// GET endpoint to fetch all environmental data
app.get('/api/environmental', async (req, res) => {
  try {
    const parameters = await Environmental.find();
    res.json(parameters); // Send the parameters as a response
  } catch (error) {
    console.error('Error fetching parameters:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
