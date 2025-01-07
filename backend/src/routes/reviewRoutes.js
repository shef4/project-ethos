const express = require('express');
const { Review } = require('../models');
const router = express.Router();

// Create a new review
router.post('/create', async (req, res) => {
  try {
    const { userId, companyId, rating, comments } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const newReview = await Review.create({ userId, companyId, rating, comments });
    return res.status(201).json({ review: newReview });
  } catch (err) {
    return res.status(500).json({ error: 'Error creating review' });
  }
});

// Get all reviews for a specific company
router.get('/company/:companyId', async (req, res) => {
  try {
    const { companyId } = req.params;
    const reviews = await Review.findAll({ where: { companyId } });

    if (reviews.length === 0) {
      return res.status(404).json({ error: 'No reviews found for this company' });
    }

    return res.status(200).json(reviews);
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching reviews' });
  }
});

module.exports = router;