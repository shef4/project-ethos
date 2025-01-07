const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');


const router = express.Router();

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;