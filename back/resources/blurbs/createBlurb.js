/* Create a new blurb entry in the db */
exports.post = function (req, res) {
  var message = req.body.message;
  if (typeof message !== 'string' && message.length === 0) {
    return res.send(422, "Could not create blurb without a message");
  }
  return req.db.collection('blurbs').insert({
    message: message.slice(0,140),
    created_at: new Date(),
    num_comments: 0
  });
};
