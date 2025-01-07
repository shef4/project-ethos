const Review = require('../models/Review');
const User = require('../models/User');
const Company = require('../models/Company');

const createReview = async (req, res) => {
  const { userId, companyId, rating, comments } = req.body;

  try {
    const review = await Review.create({ userId, companyId, rating, comments });
    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReviewsByCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const reviews = await Review.findAll({ where: { companyId } });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByCompany,
};