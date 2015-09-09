/**
 * IdeaController
 *
 * @description :: Server-side logic for managing ideas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
var Promise = require('bluebird');

module.exports = {
	create: function(req, res) {
    var data = actionUtil.parseValues(req),
      response = {};
      data.creator = req.user.id;

    Idea.create(data)
      .then(function (idea) {
        return Idea.findOne({ id: idea.id })
          .populate('tags');
      })
      .then(function (idea) {
        response.idea = idea;
        return User.findOne({ id: data.creator })
          .populate('ideas')
          .populate('badges');
      })
      .then(function (user) {
        return Promise.join(
          BadgeService.newIdea(user),
          NotifyService.newIdea(response.idea)
        );
      })
      .then(function (results) {
        response.badges = results[0];
        response.notifications = results[1];
        return res.created(response);
      })
      .catch(function (error) {
        return res.negotiate(error);
      });
  }
};

