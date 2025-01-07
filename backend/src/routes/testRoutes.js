const express = require('express');
const createFakeData = require('../utils/fakeData');
const router = express.Router();

// Route to generate fake data
router.post('/generate-fake-data', async (req, res) => {
  try {
    await createFakeData();
    res.status(200).json({ message: 'Fake data created successfully!' });
  } catch (error) {
    console.error('Error generating fake data:', error);
    res.status(500).json({ error: 'Error generating fake data' });
  }
});

module.exports = router;