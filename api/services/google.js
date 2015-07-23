var request = require('request');
var Promise = require('bluebird');

//https://developers.google.com/identity/protocols/OpenIDConnect#exchangecode
module.exports.profile = function(params) {
  var endpoint = 'https://www.googleapis.com/auth/plus.me';
  request.post()
};

module.exports.token = function(params) {
  params.url = 'https://www.googleapis.com/oauth2/v4/token';
  return request.post()
};
