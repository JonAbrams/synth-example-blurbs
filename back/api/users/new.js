var uuid = require('node-uuid');

exports.post = function (users, params, hashedPass, db, res) {
  if (!params.email || !params.username || !params.password) {
    throw {
      statusCode: 422,
      message: "Missing parameters"
    };
  }

  return users.findOne({ email: params.email })
    .then(function (user) {
      // The specified email has been taken if user was found :(
      if (user) {
        throw {
          statusCode: 422,
          message: { emailTaken: true }
        };
      }

      return users.findOne({ username: params.username });
    })
    .then(function (user) {
      // The specified email has been taken if user was found :(
      if (user) {
        throw {
          statusCode: 422,
          message: { usernameTaken: true }
        };
      }

      return users.insert({
        email: params.email,
        username: params.username,
        password: hashedPass
      });
    })
    .then(function (users) {
      var user = users[0];

      var sessionPromise = db.collection('sessions')
        .insert({
          user_id: user._id,
          token: uuid.v4()
        });

      return [sessionPromise, user];
    }).spread(function (sessions, user) {
      var session = sessions[0];
      res.cookie('auth_token', session.token);

      return {
        user: {
          username: user.username
        }
      };
    });
};
