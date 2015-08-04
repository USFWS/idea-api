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

    flagger: {
      //Assocation to User
    },

    comment: {
      //Association to Comment (optional)
    },

    idea: {
      //Association to Idea (optional)
    }

  }
};

