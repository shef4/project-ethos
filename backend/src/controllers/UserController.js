const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, passwordHash });

    console.log(`User registered: ${email}`);
    return res.status(201).json({ user });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(`Attempting login for email: ${email}`);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error('User not found:', email);
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      console.error('Invalid password for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is missing');
      throw new Error('JWT_SECRET is undefined');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
    console.log(`Generated token: ${token}`);
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error.message || error);
    res.status(500).json({ error: 'Error logging in' });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: ['id', 'email', 'username'] });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`Fetched profile for user ID ${id}:`, user.toJSON());
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };