exports.post = function (db, params) {
  if (params.email && params.username && params.password) {
    // Insert if doesn't yet exist
    // http://stackoverflow.com/questions/16358857/mongodb-atomic-findorcreate-findone-insert-if-nonexistent-but-do-not-update
    console.log("Running findAndModify", params)
    return db.collection('users').findAndModify({
      query: {
        $or: [
          { email: params.email },
          { username: params.username }
        ]
      },
      update: {
        $setOnInsert: {
          username: params.username,
          email: params.email,
          password: params.password
        },
        new: true,
        upsert: true
      }
    })
    .then(function (res) {
      console.log("Got", res)
      return res[0];
    })
    .catch(function (res) {
      console.error(res);
    });
  } else {
    throw {
      statusCode: 422,
      message: "Missing parameters"
    };
  }
};
