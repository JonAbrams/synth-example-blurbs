exports.post = function (users, params, hashedPass) {
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
      return {
        user: {
          username: users[0].username
        }
      };
    });
};
