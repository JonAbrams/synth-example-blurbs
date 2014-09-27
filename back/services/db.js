/* Connect to Mongo DB */
var db = require('promised-mongo')(process.env.MONGODB || 'synth-default-db');

/* Provide the db as a service */
exports.db = function () {
  return db;
};

exports.blurbs = function (db) {
  return db.collection('blurbs');
};

exports.users = function (db) {
  return db.collection('users');
};
