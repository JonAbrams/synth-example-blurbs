// Fetch some blurbs

exports.getIndex = function (req, res) {
  var toDate = req.params.toDate || new Date().getTime();
  var fromDate = req.params.fromDate || null;

  return req.db.collection('blurbs')  /* On the 'blurbs' collection */
    .find({
      created_at: {
        $lt: new Date(toDate),        /* Get blurbs older than toDate */
        $gt: new Date(fromDate)       /* and newer than fromDate */
      }
    })
    .sort({ created_at: -1 })         /* Sort by newest, descending */
    .limit(5)                         /* only return 5 */
    .toArray();                       /* Execute and return promise */
};
