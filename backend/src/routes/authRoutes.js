const express = require('express');
const { loginUser } = require('../controllers/UserController');
const router = express.Router();


// Middleware to verify token (placeholder comment)
// const verifyToken = require('../middleware/authMiddleware'); // Optional, to check for a valid token

// Route for login
router.post('/login', loginUser);

/**
 * POST /auth/logout
 * Logs the user out by removing the token on the client-side
 */
router.post('/logout', (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    // Placeholder for blacklisting logic (optional for added security)
    console.log(`Blacklisting token: ${token}`); // Store token in Redis/In-memory/DB if blacklisting
  
    // Respond with logout success
    res.status(200).json({ message: 'Logged out successfully' });
  });

module.exports = router;