/**
* Idea.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true,
      unique: true
    },

    description: {
      type: 'string',
      required: true
    },

    date: {
      type: 'date',
      required: true,
      defaultsTo: new Date()
    },

    status: {
      type: 'string',
      enum: [
        'Proposed',
        'Under Review',
        'Approved',
        'Under Development',
        'Warranted but Precluded',
        'No Further Action'
      ],
      defaultsTo: 'Proposed',
      required: true
    },

    // Many-to-many association
    score: {
      collection: 'user',
      via: 'votes'
    },

    // Many-to-many association
    comments: {
      model: 'comment',
      via: 'idea'
    },

    // One-to-many association
    creator:{
      model:'user'
    },

    tags: {
      type: 'array'
    }

    // Check that description is at least X characters

    // Check that description is less than 500 characters

    // Check that there are less than 7 badges

  }
};

