/**
* Comments.js
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

    flagged: {
      type: 'boolean'
    },

    commenter: {
      collection: 'user',
      via: 'comments'
    },

    idea: {
      collection: 'idea',
      via: 'ideas'
    }

  }
};

