var synth = require('synth');

/* Connect to Mongo DB */
var r = require('rethinkdbdash')({ db: 'blurbs' });

/* Provide DB connection to request handlers */
synth.app.use(function (req, res, next) {
  req.r = r;
  next();
});

module.exports = synth();
