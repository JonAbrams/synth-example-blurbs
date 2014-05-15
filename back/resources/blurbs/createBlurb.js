/* Create a new blurb entry in the db */
exports.post = function (req, res) {
  var message = req.body.message;
  if (typeof message !== 'string' || message.length === 0) {
    throw {
      statusCode: 422,
      message: "Could not create blurb without a message",
      public: true
    };
  }

  return req.r.table('blurbs').insert({
    message: message.slice(0,140),
    created_at: new Date(),
    num_comments: 0
  }, {
    returnVals: true
  })
  .run()
  .then(function (result) {
    return result.new_val;
  });
};
