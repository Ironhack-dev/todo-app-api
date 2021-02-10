const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');


module.exports = session({
  secret: process.env.SESSION_SECRET || 'TODO - APP',
  resave: true,
  saveUninitialized: false,
  cookie: {
    sameSite: 'none',
    secure: process.env.SESSION_SECURE,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7
    * 1000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60 * 24 * 7
  })
});