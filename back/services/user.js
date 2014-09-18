var cookieParser = require('cookie').parse;

exports.user = function (db, cookies) {
  if (!cookies.auth_token) return null;

  return db.collection('sessions').findOne({
    token: cookies.auth_token
  }).then(function (session) {
    if (!session) return null;

    return db.collection('users').findOne({
      _id: session.user_id
    });
  });
};

exports.cookies = function (req) {
  return cookieParser(req.headers.cookie || "");
};
