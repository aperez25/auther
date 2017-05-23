var router = require('express').Router();
var passport = require('passport')

router.get('/me', function (req, res, next){
  res.json(req.session);
});

// Google authentication and login
router.get('/google', passport.authenticate('google', { scope: 'email' }));

// ROUTING IS GOING TO GOOGLE AUTH BUT NOT GETTING A CALLBACK

// handle the callback after Google has authenticated the user
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: '150144051248-7uvcv3k0k299vohquilhah21vf791e0j.apps.googleusercontent.com',
    clientSecret: 'u_ReuHgIeknL_78IIgtdH0KM',
    callbackURL: 'http://localhost:8080/'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    console.log('---', 'in verification callback', profile, '---');
done();
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.

  })
);

module.exports = router;
