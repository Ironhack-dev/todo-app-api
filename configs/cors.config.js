const cors = require('cors');
const whitelist = ['http://localhost:3000'];

const corsMiddleware = cors( {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
})

module.exports = corsMiddleware;