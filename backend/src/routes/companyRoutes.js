const express = require('express');
const { Company } = require('../models');
const router = express.Router();

// Create a new company
router.post('/', async (req, res) => {
  try {
    const { name, industry, description } = req.body;

    // Check for duplicate company
    const existingCompany = await Company.findOne({ where: { name } });
    if (existingCompany) {
      return res.status(400).json({ error: 'Company with this name already exists.' });
    }

    const newCompany = await Company.create({ name, industry, description });
    return res.status(201).json({ company: newCompany });
  } catch (err) {
    return res.status(500).json({ error: 'Error creating company' });
  }
});

// Get details of a specific company by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    return res.status(200).json(company);
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching company details' });
  }
});

// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.findAll();
    return res.status(200).json(companies);
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching companies' });
  }
});

module.exports = router;