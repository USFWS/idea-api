/**
* Message.js
*
* @description :: A SailsJS v0.11.0 workaround for a Many-to-Many Through relationship
*                 This model allows me to add attributes to the join table until
*                 through associations are supported.
*
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    read: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },

    // A message belongs to a single notification
    notification: {
      model: 'notification'
    },

    // A message belongs to a single user
    user: {
      model: 'user'
    }

  }
};

