/**
* Flag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    type: {
      type: 'string',
      required: true,
      enum: ['Idea', 'Comment']
    },

    reason: {
      type: 'string'
    },

    response: {
      type: 'string'
    },

    resolved: {
      type: 'boolean',
      defaultsTo: false
    },

    // A flag can be created by a single User
    flagger: {
      model: 'user'
    },

    // A flag can be associated with one comment
    comment: {
      model: 'comment'
    },

    // A flag can be associated with one Idea
    idea: {
      model: 'idea'
    }

  }
};

