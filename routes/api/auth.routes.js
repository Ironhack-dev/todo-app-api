const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

router.post('/signup', (req, res, next) => {
  // Signup implementation
});

router.post('/login', (req, res, next) => {
  // Login implementation
});

router.post('/logout', (req, res, next) => {
  // Logout implementation
});

router.get('/loggedin', (req, res, next) => {
  // Loggedin implementation
});

module.exports = router;
