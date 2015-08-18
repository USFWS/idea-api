/**
* Badge.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      unique: true
    },

    description: {
      type: 'string',
      required: true
    },

    approved: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },

    // A badge can have many owners
    owners: {
      collection: 'user',
      via: 'badges'
    }

  }
};

