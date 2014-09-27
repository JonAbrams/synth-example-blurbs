/* Create a new blurb entry in the db */
exports.post = function (db, params, user) {
  var message = params.message;

  if (typeof message !== 'string' || message.length === 0) {
    throw {
      statusCode: 422,
      message: "Could not create blurb without a message"
    };
  }

  return db.collection('blurbs').insert({
    message: message.slice(0,140),
    created_at: new Date(),
    num_comments: 0,
    username: user && user.username
  });
};
