const express = require('express');
const { registerUser, getUserProfile, loginUser } = require('../controllers/UserController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', getUserProfile);

module.exports = router;