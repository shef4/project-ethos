const express = require('express');
const { loginUser } = require('../controllers/UserController');
const router = express.Router();

// Route for login
router.post('/login', loginUser);

module.exports = router;