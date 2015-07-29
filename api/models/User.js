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

    badges: {
      type: 'array'
    },

    comments: {
      collection: 'comments',
      via: 'commentor'
    },

    ideas:{
      collection: 'idea',
      via: 'creator'
    },

    votes: {
      collection: 'idea',
      via: 'score'
    },

  }
};

