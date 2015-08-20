/**
* User.js
*
* @description :: User model
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    type: {
      type: 'string',
      enum: ['Admin', 'Moderator', 'User'],
      required: true,
      defaultsTo: 'User'
    },

    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    about: {
      type: 'string'
    },

    picture: {
      type: 'string'
    },

    office: {
      type: 'string'
    },

    occupation: {
      type: 'string'
    },

    googleId: {
      type: 'string',
      required: true
    },

    inTimeout: {
      type: 'boolean',
      defaultsTo: false
    },

    // A user can have many badges
    badges: {
      collection: 'badge',
      via: 'owners'
    },

    // A User can have many comments
    comments: {
      collection: 'comment',
      via: 'commenter'
    },

    // A User can have many ideas
    ideas:{
      collection: 'idea',
      via: 'creator'
    },

    // A User can have many upvotes
    votes: {
      collection: 'idea',
      via: 'score'
    },

    // A User can have many flags
    flags: {
      collection: 'flag',
      via: 'flagger'
    },

    subscriptions: {
      type: 'json',
      defaultsTo: {
        tags: {
          inApp: true,
          email: true,
          items: []
        },
        ideas: {
          inApp: true,
          email: true,
          items: []
        },
        badges: {
          inApp: true,
          email: false
        }
      }
    }

  }
};

