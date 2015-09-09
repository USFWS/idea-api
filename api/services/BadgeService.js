var _ = require('underscore');
var Promise = require('bluebird');

module.exports = {

  newIdea: function(user) {
    return Promise.join(
      BadgeService.innovator(user),
      BadgeService.prolificInnovator(user)
    ).then(function (results) {
      var badges = [];

      _.each(results, function(result) {
        if (result) {
          user.badges.add(result);
          user.save();
          badges.push(result);
        }
      });

      return badges;
    });
  },

  newComment: function(user) {
    return Promise.join(
      BadgeService.inquiringMind(user),
      BadgeService.firstResponder(user),
      BadgeService.fountOfKnowledge(user)
    );
  },

  // newVote: function() {
  //   // Check/Award Investor badge
  //   // ??? Check/Award Henry Ford badge to idea.creator when idea.votes > QUOTA
  //   // ^ Henry Ford limited to beaurocratic process?  Through tag?
  //   // ??? Check/Award Steve Jobs badge to idea.creator when idea.votes > QUOTA
  //   // ^ Steve Jobs limited to Technology? Through tag?
  // },

  // // Manually connecting two similar ideas
  // newConnection: function() {
  //   // Check/Award Team Player badge
  // },

  // rebel: function () {
  //   // Check/Award Rebel Without a Cause badge for being put in timeout
  // },

  // moderator: function () {
  //   // Check/Award Subject Matter Expert on upgrade to Moderator account type
  // },

  needsBadge: function (user, badgeName) {
    return !_.findWhere(user.badges, { name: badgeName });
  },

  innovator: function(user) {
    var badgeName = 'Innovator';
    if(BadgeService.needsBadge(user, badgeName)) {
      return Badge.findByName(badgeName);
    }
    return false;
  },

  prolificInnovator: function(user) {
    var badgeName = 'Prolific Innovator';
    if(BadgeService.needsBadge(user, badgeName) && user.ideas.length >= 5) {
      return Badge.findByName(badgeName);
    }
    return false;
  },

  inquiringMind: function(user) {
    var badgeName = 'Inquiring Mind';
    if(BadgeService.needsBadge(user, badgeName)) {
      return Badge.findByName(badgeName);
    }
    return false;
  },

  firstResponder: function(user) {
    var badgeName = 'First Responder';
    // Second person to comment
    if(BadgeService.needsBadge(user, badgeName) && user.comments.length === 2) {
      return Badge.findByName(badgeName);
    }
    return false;
  },

  fountOfKnowledge: function(user) {
    var badgeName = 'Fount of Knowledge';
    if(BadgeService.needsBadge(user, badgeName) && user.comments.length >= 5) {
      return Badge.findByName(badgeName);
    }
    return false;
  }
};
