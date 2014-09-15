var uuid = require('node-uuid');

exports.post = function (users, db, params, comparePass) {
  if (!params.username || !params.password) {
    throw {
      statusCode: 422,
      message: "Missing parameters"
    };
  }

  return users
    .findOne({
      $or: [
        { username: params.username },
        { email: params.username }
      ]
    })
    .then(function (user) {
      if (!user) {
        throw {
          statusCode: 404,
          message: { userNotFound: true }
        };
      }
      return comparePass(params.password, user.password)
        .then(function (matching) {
          if (!matching) {
            throw {
              statusCode: 422,
              message: {
                invalidPassword: true
              }
            };
          }
          return db.collection('sessions')
            .insert({
              user_id: user._id,
              token: uuid.v4()
            })
            .then(function (session) {
              return {
                user: user,
                session: session
              };
            });
        });
    });
};
