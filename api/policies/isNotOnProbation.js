module.exports = function (req, res, next) {

  User.findOne({ id: req.user.id }).then(function (user) {
    if( user.probation ) {
      return res.forbidden('You are on probation.');
    } else {
      next();
    }
  }).catch(function (err) {
    return res.negotiate(err);
  });
};
