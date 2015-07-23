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
      requried: true
    },

    email: {
      type: 'email',
      required: true,
      unique: true
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

    badges: {
      type: 'array'
    },

    ideas:{
      collection: 'idea',
      via: 'creator'
    }

  }
};

