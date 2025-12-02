const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection (change DB name if you like)
const MONGODB_URI = 'mongodb://localhost:27017/testdb_apply';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Application schema & model
const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  program: { type: String, required: true },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const registrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  program: { type: String, required: true },
  address: { type: String, required: true },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Application = mongoose.model('Application', applicationSchema);
const Registration = mongoose.model('Registration', registrationSchema);

// Route: receive form submission from apply.html
app.post('/api/applications', async (req, res) => {
  const { fullName, email, phone, program, details } = req.body;

  try {
    const application = new Application({
      fullName,
      email,
      phone,
      program,
      details
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route: receive form submission from registration.html
app.post('/api/registrations', async (req, res) => {
  const { fullName, email, phone, program, address, details } = req.body;

  try {
    const registration = new Registration({
      fullName,
      email,
      phone,
      program,
      address,
      details
    });

    await registration.save();
    res.status(201).json({ message: 'Registration submitted successfully' });
  } catch (error) {
    console.error('Error saving registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
