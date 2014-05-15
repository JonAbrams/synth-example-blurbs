// Fetch some blurbs

exports.getIndex = function (req, res) {
  var r = req.r;
  var toDate = req.query.toDate || new Date();
  var fromDate = req.query.fromDate || null;

  return r.table('blurbs')  /* On the 'blurbs' collection */
    .filter(
      r.row('created_at')
      .gt( new Date(fromDate) )       /* Newer than fromDate */
      .and(
        r.row('created_at')
        .lt(new Date(toDate))         /* Older than toDate */
      )
    )
    .orderBy( r.desc('created_at') )  /* Sort by newest, descending */
    .limit(5)                         /* only return 5 */
    .run()                            /* Execute and get cursor */
    .then(function (cursor) {
      return cursor.toArray();        /* Return data */
    });
};
