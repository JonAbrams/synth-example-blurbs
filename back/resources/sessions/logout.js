exports.delete = function (res, db, cookies) {
  db.collection('sessions').remove({
    token: cookies.auth_token
  });
  res.clearCookie('auth_token');

  return "success";
};
