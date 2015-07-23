/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var qs = require('qs');

module.exports = {
  google: function(req, res) {
    // https://developers.google.com/identity/protocols/OpenIDConnect#discovery
    var tokenEndpoint =


    var params = {
      form: {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: sails.config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
      },
      json: true
    };

    google.token(params, function(err, r, body) {
      if(err) res.negotiate(err);

      if (req.headers.authorization) {
        //User is already logged in -- Link the accounts
      } else {
        // Find or Create a user account
        var token = sailsTokenAuth.decodeToken(body.id_token);
        User.findOne({ googleId: token.payload.sub }).exec(function(err, foundUser) {
          if (err) return res.negotiate(err);
          if (foundUser) {
            var jwt = sailsTokenAuth.createToken(foundUser);
            return res.send({ token: jwt, user: foundUser });
          } else {

            var params = {
              googleId: token.payload.sub,
              email: token.payload.email,
              accountType: accountType
            };

            User.create(params).exec(function (err, newUser) {
              if(err) res.negotiate(err);
              var jwt = sailsTokenAuth.createToken(newUser);
              res.send({ token: jwt, user: newUser });
            });
          }
        });
      }
    });
  }
};



