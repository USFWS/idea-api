/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
var Promise = require('bluebird');
var BadgeService = Promise.promisifyAll(require('../Services/BadgeService'));

module.exports = {
	create: function(req, res) {
    var data = actionUtil.parseValues(req),
      response = {
        badges: []
      },
      messages = [],
      message = {},
      idea;

    Idea.findById(data.idea).then(function (commentedIdea) {
      idea = commentedIdea;
    });

    Comment.create(data)
      .then(function (comment) {
        response.comment = comment;
        return User.findOne({ id: data.commenter })
          .populate('comments')
          .populate('badges');
      })
      .then(function (user) {
        response.user = user;
        return BadgeService.newComment(user);
      })
      .then(function (results) {
        var inquiringMind = results[0],
          firstResponder = results[1],
          fountOfKnowledge = results[2];

        if (inquiringMind) {
          response.user.badges.add(inquiringMind[0]);
          response.user.save();
          response.badges.push('Innovator');
        } else if (firstResponder) {
          response.user.badges.add(firstResponder[0]);
          response.user.save();
          response.badges.push('First Responder');
        } else if (fountOfKnowledge) {
          response.user.badges.add(fountOfKnowledge[0]);
          response.user.save();
          response.badges.push('Fount of Knowledge');
        }
        return Notification.create({
          type: 'New comment',
          title: 'A new comment was posted to an idea you subscribe to: ' + idea.title,
          message: data.body,
          idea: data.idea
        });
      })
      .then(function (notification) {
        message.notification = notification.id;
        return User.find().populate('ideaSubscriptions', { where: { id: data.idea } });
      })
      .then(function (subscribers) {
        _.each(subscribers, function (user) {
          message.user = user.id;
          messages.push(message);
        });
        return Message.create(messages);
      })
      .then(function (messages) {
        return res.created(response);
      })
      .catch(function (error) {
        return res.negotiate(error);
      });
  }
};

