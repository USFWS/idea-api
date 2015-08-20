/**
* Idea.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true,
      unique: true
    },

    description: {
      type: 'string',
      required: true
    },

    date: {
      type: 'date',
      required: true,
      defaultsTo: new Date()
    },

    status: {
      type: 'string',
      enum: [
        'Proposed',
        'Under Review',
        'Response Received'
      ],
      defaultsTo: 'Proposed',
      required: true
    },

    // An idea can have many tags
    tags: {
      collection: 'tag',
      via: 'ideas'
    },

    // An idea can have many upvotes
    score: {
      collection: 'user',
      via: 'votes'
    },

    // An idea can have many comments
    comments: {
      collection: 'comment',
      via: 'idea'
    },

    // An idea can have many flags
    flags: {
      collection: 'flag',
      via: 'idea'
    },

    // An idea can have one creator
    creator:{
      model:'user'
    }

    // Check that description is at least X characters

    // Check that description is less than 500 characters

    // Check that there are less than 7 badges

  },

    afterCreate: function(idea, cb) {
      User.findOne({ id: idea.creator })
        .then(function (user) {
          user.subscriptions.ideas.items.push(idea.id);
          user.save();
          cb();
        })
        .catch(function (error) {
          cb(error);
        });
      // Add idea ID to user's subscriptions
    },

    afterDestroy: function(idea, cb) {
      var idea = idea[0];
      User.findOne({ id: idea.creator })
        .then(function (user) {
          var items = user.subscriptions.ideas.items,
            index = items.indexOf(idea.id);

          if (index > -1) {
            user.subscriptions.ideas.items.splice(index, 1);
            user.save();
          }
          cb();
        })
        .catch(function (error) {
          cb(error);
        });
    }
};

