const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');


module.exports = session({
  secret: process.env.SESSION_SECRET || 'TODO - APP',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60 * 24 * 7
  })
});