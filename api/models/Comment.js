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

    flagged: {
      type: 'boolean',
      defaultsTo: false
    },

    // A comment can have one commenter
    commenter: {
      model: 'user'
    },

    // A comment can be attached to one idea
    idea: {
      model: 'idea',
    }
  }
};

