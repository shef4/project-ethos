const { UniqueConstraintError } = require('sequelize');

const createCompany = async (req, res) => {
  try {
    const { name, industry, description } = req.body;
    const company = await Company.create({ name, industry, description });
    res.status(201).json(company);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      res.status(400).json({ error: 'Company with this name already exists.' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};