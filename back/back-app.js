var synth = require('synth');

/* Connect to Mongo DB */
var db = require('promised-mongo')(process.env.MONGODB || 'synth-default-db');

/* Define your middleware here */
synth.app.use(function (req, res, next) {
  req.appName = "bigboard";
  next();
});

/* Provide DB connection to request handlers */
synth.app.use(function (req, res, next) {
  req.db = db;
  next();
});

module.exports = synth();
