/**
* Notification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    type: {
      type: 'string',
      required: true,
      enum: [
        'Upvote received',
        'New comment',
        'Idea status change',
        'New badge',
        'Global message',
        'New idea for subscribed tag'
      ]
    },

    title: {
      type: 'string',
      required: true
    },

    message: {
      type: 'string',
      required: true
    },

    // Many to Many through association workaround
    // 1:M relationship with Message M:1 relationship with User
    // A notification has many messages -- one for each user
    // This allows us to add a "read" attribute to the message
    messages: {
      collection: 'message',
      via: 'notification'
    },

    // A notification can pertain to one idea
    idea: {
      model: 'idea'
    }

  }
};

