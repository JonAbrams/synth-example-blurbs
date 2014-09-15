var _ = require('lodash'),
    Promise = require('bluebird'),
    bodyParser = Promise.promisify(require('body-parser').json()),
    bcrypt = require('bcrypt'),
    hash = Promise.promisify(bcrypt.hash),
    compare = Promise.promisify(bcrypt.compare);

exports.params = function (req, res) {
  // Combines the three sources of parameters into one, and return them in one object
  // Similar to how Rails and various other frameworks do it
  return bodyParser(req, res).then(function () {
    return _.merge({}, req.query, req.params, req.body);
  });
};

exports.hashedPass = function (params) {
  if (params.password) {
    return hash(params.password, 10);
  }
};

exports.comparePass = function () {
  return compare;
};
