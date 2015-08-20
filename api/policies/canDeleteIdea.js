var _ = require('underscore');

module.exports = function (req, res, next) {
  var userId = req.user.id,
    ideaId = req.params.id;

  User.findOne({ id: userId }).populate('ideas').then(function (user) {
    // Only the idea creator or administrator may delete an idea
    if(_.findWhere(user.ideas, { id: ideaId }) || user.type === 'Admin') {
      next();
    } else {
      return res.forbidden('You cannot delete this idea.');
    }
  }).catch(function (err) {
    return res.negotiate(err);
  });
};
