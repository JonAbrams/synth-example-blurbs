// Fetch some blurbs

exports.getIndex = function (db, params, user) {
  var toDate = params.toDate || new Date();
  var fromDate = params.fromDate || null;


  return db.collection('blurbs')  /* On the 'blurbs' collection */
    .find({
      created_at: {
        $lt: new Date(toDate),        /* Get blurbs older than toDate */
        $gt: new Date(fromDate)       /* and newer than fromDate */
      }
    })
    .sort({ created_at: -1 })         /* Sort by newest, descending */
    .limit(5)                         /* only return 5 */
    .toArray()                        /* Execute and return promise */
    .then(function (blurbs) {         /* Format API response */
      return {
        blurbs: blurbs,
        user: user && {
          username: user.username
        }
      };
    });
};
