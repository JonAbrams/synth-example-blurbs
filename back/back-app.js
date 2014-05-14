var synth = require('synth');

/* Connect to Mongo DB */
var db = require('promised-mongo')(process.env.MONGODB || 'synth-default-db');

/* Provide DB connection to request handlers */
synth.app.use(function (req, res, next) {
  req.db = db;
  next();
});

var app = module.exports = synth();

if (!process.env.HEROKU) return;

var port = Number(process.env.PORT || 5000);

app.listen(port, function () {
  console.log('Listening on port ' + port);
});
