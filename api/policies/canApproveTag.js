module.exports = function (req, res, next) {

  User.findOne({ id: req.user.id }).then(function (user) {
    if( user.type === 'Moderator' || user.type === 'Admin') {
      next();
    } else {
      return res.forbidden('Only moderators can approve a tag.');
    }
  }).catch(function (err) {
    return res.negotiate(err);
  });
};
