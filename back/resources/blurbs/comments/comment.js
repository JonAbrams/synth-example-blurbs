/* Inclue the Bluebird promises library */
var Promise = require('bluebird');

/* Store a new comment */
exports.post = function (req, res) {
  var blurbsId = req.params.blurbsId;
  var message = req.body.message;
  if (typeof message !== 'string' && message.length === 0) {
    return res.send(422, "Could not create blurb without a message");
  }
  req.db.collection('blurbs').findAndModify({
    query: { _id: req.db.ObjectId(blurbsId) },
    update: { $inc: { num_comments: 1 } }
  });
  return req.db.collection('comments').insert({
    blurbsId: blurbsId,
    message: message.slice(0,140),
    created_at: new Date()
  });
};

/* Get all the comments for a blurb */
/* By default mongo fetches at most 20 records */
exports.getIndex = function (req, res) {
  var blurb = req.db.collection('blurbs').findOne({
    _id: req.db.ObjectId(req.params.blurbsId)
  });

  var comments = req.db.collection('comments')
    .find({ blurbsId: req.params.blurbsId })
    .sort({
      created_at: -1
    }).toArray();

  /* For more about Promise.all and spread: http://bit.ly/1naIqY1 */
  /* Basically, it turns two promises into one */
  return Promise.all([blurb, comments]).spread(function (blurb, comments) {
    return {
        blurb: blurb,
        comments: comments
    };
  });
};
