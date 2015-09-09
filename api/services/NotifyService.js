var _ = require('underscore');

module.exports = {

  global: function (data) {
    var messages = [],
      message = {};

    return Notification.create(data)
      .then(function (notification) {
        message.notification = notification.id;
        return User.find();
      })
      .then(function (users) {
        _.each(users, function (user) {
          message.user = user.id;
          messages.push(message);
        });
        return Message.create(messages);
      })
      .catch(function (error) {
        return res.negotiate(error);
      });
  },

  newIdea: function (idea) {
    var messages = [],
      message = {},
      notifications = [],
      notification = {
        type: 'New idea for subscribed tag',
        title: 'New Idea under subscribed Tag',
        idea: idea.id
      },
      subscriptions = [];

    // This is pretty ugly because Sails doesn't support deep queries
    // so I had to flip the query and search by tag instead of user
    // https://github.com/balderdashy/waterline/issues/266
    return Tag.find({ text: _.pluck(idea.tags, 'text') }).populate('subscribers')
      .then(function (tags) {
        _.each(tags, function (tag) {
          if (tag.subscribers.length) {
            subscriptions.push({ tag: tag.text, subscribers: tag.subscribers});
            notification.message = 'A new idea ' + idea.title + 'was published with the tag: ' + tag.text;
            notifications.push(notification);
          }
        });
        return Notification.create(notifications);
      })
      .then(function (notifications) {
        var name;
        _.each(notifications, function (notification) {
          name = notification.message.split(' ').splice(-1)[0];
          _.each(subscriptions, function (subscription, tag) {
            if ( name === subscription.tag ) {
              message.notification = notification.id;
              _.each(subscription.subscribers, function (subscriber) {
                message.user = subscriber.id;
                messages.push(message);
              });
            }
          });
        });
        return Message.create(messages);
      });
  },

  newBadge: function (badgeName) {

  }

};
