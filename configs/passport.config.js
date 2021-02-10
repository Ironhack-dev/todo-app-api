const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findOne({ _id: id })
    .then((user) => next(null, user))
    .catch(next);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, next) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return next(null, false, { message: 'Usuario no registrado.' });
          }

          if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, { message: 'Usuario o contraseña incorrectos.' });
          }

          return next(null, user);
        })
        .catch(err => next(err))
    })
);
