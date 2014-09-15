exports.post = function (tweets, params, hashedPass) {
  if (!params.email || !params.username || !params.password) {
    throw {
      statusCode: 422,
      message: "Missing parameters"
    };
  }

  return tweets.findOne({ email: params.email })
    .then(function (user) {
      // The specified email has been taken if user was found :(
      if (user) {
        throw {
          statusCode: 422,
          message: { emailTaken: true }
        };
      }

      return tweets.findOne({ username: params.username });
    })
    .then(function (user) {
      // The specified email has been taken if user was found :(
      if (user) {
        throw {
          statusCode: 422,
          message: { usernameTaken: true }
        };
      }

      return tweets.insert({
        email: params.email,
        username: params.username,
        password: hashedPass
      });
    })
    .then(function (users) {
      return {
        username: users[0].username
      };
    });
};
