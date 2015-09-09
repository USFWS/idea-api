/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    body: {
      type: 'string',
      required: true
    },

    // A comment can have many flags
    flags: {
      collection: 'flag',
      via: 'comment'
    },

    // A comment can have one commenter
    commenter: {
      model: 'user'
    },

    // A comment can be attached to one idea
    idea: {
      model: 'idea',
    }
  },

  afterCreate: function(comment, cb) {
    Idea.findOne({ id: comment.idea })
      .populate('subscribers').then(function (idea) {
      if (!_.findWhere(idea.subscribers, { id: comment.commenter })) {
        idea.subscribers.add(comment.commenter);
        idea.save();
      }
      cb();
    }).catch(function (err) {
      console.log('Catch: ',err);
      return cb(err);
    });
  }
};

