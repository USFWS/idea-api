/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  subscribe: function (req, res) {
    var type = req.param('type'),
      id = req.param('id');

    if (type === 'tags' || type === 'ideas') {

      User.findOne({ id: req.user.id }).then(function (user) {
        var subscriptions = user.subscriptions[type];

        if (_.contains(subscriptions.items, id)) {
          return res.ok(user);
        }
        user.subscriptions[type].items.push(id);
        user.save();
        res.ok(user);
      }).catch(function (error) {
        return res.negotiate(error);
      });
    } else {
      return res.badRequest('Subscription type must be \'tag\' or \'idea\'.');
    }
  },

  notifications: function (req, res) {
    var query = { user: req.user.id };
    if (req.param('read') !== undefined)
      query.read = req.param('read');

    Message.find(query).populate('notification').then(function (messages) {
      return res.ok(messages);
    }).catch(function (error) {
      return res.negotiate(error);
    });
  }

};

