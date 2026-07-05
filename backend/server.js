const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Ensure MongoDB is running locally or provide a valid MONGO_URI in .env');
  });

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date()
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, serviceType, address, message } = req.body;

    // Simple validation
    if (!name || !email || !phone || !serviceType || !address || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newContact = new Contact({ name, email, phone, serviceType, address, message });
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
  if (password === ADMIN_PASSWORD) {
    res.status(200).json({ success: true, token: password });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Server error fetching contacts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
