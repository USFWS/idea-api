/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
var _ = require('underscore');

module.exports = {

  global: function (req, res) {
    var data = actionUtil.parseValues(req);

    // Creates a Global notification, then associates
    // one message per user of the Idea Board
    NotifyService.global(data)
      .then(function (messages) {
        return res.ok();
      })
      .catch(function (error) {
        return res.negotiate(error);
      });
  }
};

