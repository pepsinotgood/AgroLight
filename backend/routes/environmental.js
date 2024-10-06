// backend/routes/environmental.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define your Environmental Schema
const EnvironmentalSchema = new mongoose.Schema({
  parameterType: { type: String, required: true },
  idealValue: { type: Number, required: true },
  minSatisfactory: { type: Number, required: true },
  maxSatisfactory: { type: Number, required: true },
  currentValue: { type: Number, required: true },
  unitValue: { type: String, required: true },
  timestamp: { type: String, required: true }, // ISO timestamp
});

// Create a model from the schema
const Environmental = mongoose.model('Environmental', EnvironmentalSchema);

// POST endpoint to handle data submission
router.post('/', async (req, res) => {
  try {
    const newEnvironmentalData = new Environmental(req.body);
    await newEnvironmentalData.save();
    res.status(201).json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Error saving data' });
  }
});

// GET endpoint to fetch all environmental parameters
router.get('/', async (req, res) => {
  try {
    const parameters = await Environmental.find();
    res.json(parameters); // Send the parameters as a response
  } catch (error) {
    console.error('Error fetching parameters:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the router
module.exports = router;
