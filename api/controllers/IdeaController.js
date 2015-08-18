/**
 * IdeaController
 *
 * @description :: Server-side logic for managing ideas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
var Promise = require('bluebird');
var BadgeService = Promise.promisifyAll(require('../Services/BadgeService'));

module.exports = {
	create: function(req, res) {
    var data = actionUtil.parseValues(req),
      response = {};

    Idea.create(data)
      .then(function (idea) {
        response.idea = idea;
        return User.findOne({ id: data.creator }).populate('ideas').populate('badges');
      })
      .then(function (user) {
        response.user = user;
        return BadgeService.newIdea(user);
      })
      .then(function (results) {
        console.log(results);
        var innovator = results[0],
          prolific = results[1];

        if (innovator) {
          response.user.badges.add(innovator[0]);
          response.user.save();
          response.badges = ['Innovator'];
        } else if (prolific) {
          response.user.badges.add(prolific[0]);
          response.user.save();
          response.badges = ['Prolific Innovator'];
        }
        return res.created(response);
      })
      .catch(function(error) {
        return res.negotiate(error);
      });

        //   if (!BadgeService.hasBadge(user, 'Innovator')) {
        //     console.log('No innovator badge');
        //     Badge.findByName('Innovator').exec(function (err, badge) {
        //       if (err) return res.negotiate(err);

        //       user.badges.add(badge);
        //       user.save();
        //     });
        //   }

        //   if (user.ideas.length >= 5 && !BadgeService.hasBadge(user, 'Prolific Innovator')) {
        //     console.log('No prolific innovator badge');
        //     Badge.findByName('Prolific Innovator').exec(function (err, badge) {
        //       if (err) return res.negotiate(err);

        //       user.badges.add(badge);
        //       user.save();
        //     });
        //   }
        // });
  }
};

