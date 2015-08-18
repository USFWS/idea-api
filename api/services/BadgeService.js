var _ = require('underscore');
var Promise = require('bluebird');

module.exports = {

  newIdea: function(user) {
    var service = BadgeService;
    return Promise.join(service.innovator(user), service.prolificInnovator(user));
  },

  // newComment: function() {
  //   // Check/Award Inquiring badge
  //   // Check/Award First Responder badge if idea.comments.length === 2
  //   // Check/Award Fount of Knowledge badge if user.comments.length >= 5
  // },

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
  }
};
