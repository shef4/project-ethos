const express = require('express');
const User = require('../models/User');
const Company = require('../models/Company');
const Review = require('../models/Review');
const createFakeData = require('../utils/fakeData');

const router = express.Router();

router.post('/create-data', async (req, res) => {
  try {
    const user = await User.create({ email: 'test@example.com', username: 'testuser', passwordHash: 'hashedpassword' });
    const company = await Company.create({ name: 'Ethos Inc', industry: 'Tech', description: 'A tech company' });
    const review = await Review.create({ userId: user.id, companyId: company.id, rating: 5, comments: 'Great company!' });

    res.status(201).json({ user, company, review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Route to generate fake data
router.get('/generate-fake-data', async (req, res) => {
  try {
    await createFakeData();
    res.status(200).json({ message: 'Fake data generated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error generating fake data' });
  }
});

module.exports = router;