exports.getIndex = function (blurbs, user, params) {
  return blurbs.find({
      username: params.user_id
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
