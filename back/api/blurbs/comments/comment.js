/* Inclue the Bluebird promises library */
var Promise = require('bluebird');

/* Store a new comment */
exports.post = function (params, db, user) {
  var blurbsId = params.blurbsId;
  var message = params.message;

  if (typeof message !== 'string' && message.length === 0) {
    throw {
      statusCode: 422,
      message: "Could not create blurb without a message"
    };
  }

  db.collection('blurbs').findAndModify({
    query: { _id: db.ObjectId(blurbsId) },
    update: { $inc: { num_comments: 1 } }
  });

  return db.collection('comments').insert({
    blurbsId: blurbsId,
    message: message.slice(0,140),
    created_at: new Date(),
    username: user && user.username
  });
};

/* Get all the comments for a blurb */
/* By default mongo fetches at most 20 records */
exports.getIndex = function (user, db, params) {
  var blurb = db.collection('blurbs').findOne({
    _id: db.ObjectId(params.blurbsId)
  });

  var comments = db.collection('comments')
    .find({ blurbsId: params.blurbsId })
    .sort({
      created_at: -1
    }).toArray();

  return Promise.props({
    blurb: blurb,
    comments: comments,
    user: user && {
      username: user.username
    }
  });
};
