const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
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
            next(null, false, { message: 'Usuario no registrado.' });
            return;
          }

          if (!bcrypt.compareSync(password, user.password)) {
            next(null, false, { message: 'Contraseña incorrecta.' });
            return;
          }

          next(null, user);
        })
        .catch(err => next(err))
    })
);
