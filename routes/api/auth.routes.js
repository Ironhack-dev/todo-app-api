const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (password.length <= 2) {
    return res.status(400).json({ message: 'Please make your password at least 3 characters long' })
  }

  if (!username || !email) {
    return res.status(400).json({ message: 'Please fill all the fields in the form' })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: 'User exists. Please change your email.' })
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashPass
      })

      newUser.save()
        .then(() => {
          req.login(newUser, (err) => {
            if (err) {
              return res.status(500).json({ message: 'Session save went bad.' });
            }

            return res.status(200).json(newUser);
          })
        })
        .catch(err => res.status(500).json(err))

    })
    .catch(err => res.status(500).json(err))
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (!theUser) {
      return res.status(401).json(failureDetails);
    }

    req.login(theUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Session save went bad.' });
      }

      return res.status(200).json(theUser);
    })
  })(req, res, next)
});

router.post('/logout', (req, res) => {
  // req.logout is defined by passport
  req.logout();
  return res.status(200).json({ message: 'Log out success!' })
});

router.get('/loggedin', (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  return res.status(403).json({ message: 'Forbbiden' })
});

module.exports = router;
