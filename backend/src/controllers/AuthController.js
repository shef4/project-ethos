const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
};