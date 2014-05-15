/* Inclue the Bluebird promises library */
var Promise = require('bluebird');

/* Store a new comment */
exports.post = function (req, res) {
  var r = req.r;
  var blurbsId = req.params.blurbsId;
  var message = req.body.message;
  if (typeof message !== 'string' && message.length === 0) {
    return res.send(422, "Could not create blurb without a message");
  }

  r.table('blurbs')
  .get(blurbsId)
  .update({
    num_comments: r.row('num_comments').add(1)
  }).run();

  return r.table('comments').insert({
    blurbsId: blurbsId,
    message: message.slice(0,140),
    created_at: new Date()
  }, {
    returnVals: 1
  })
  .run()
  .then(function (result) {
    return result.new_val;
  });
};

/* Get all the comments for a blurb */
/* By default mongo fetches at most 20 records */
exports.getIndex = function (req, res) {
  var r = req.r;

  var comments = r.table('comments')
    .filter({
      blurbsId: req.params.blurbsId
    })
    .orderBy( r.desc('created_at') )
    .limit(5)
    .run()
    .then(function (cursor) {
      return cursor.toArray();
    });

  var blurb = r.table('blurbs').get(req.params.blurbsId).run();

  return Promise.props({
    comments: comments,
    blurb: blurb
  });
};
