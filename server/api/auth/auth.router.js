var router = require('express').Router();
var passport = require('passport');
var User = require('../users/user.model');


router.get('/me', function (req, res, next){
  res.json(req.session);
});

// Google authentication and login
router.get('/google', passport.authenticate('google', { scope: 'email' }));

// ROUTING IS GOING TO GOOGLE AUTH BUT NOT GETTING A CALLBACK

// handle the callback after Google has authenticated the user
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/stories', // or wherever
    failureRedirect: '/login' // or wherever
  })
);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: '150144051248-7uvcv3k0k299vohquilhah21vf791e0j.apps.googleusercontent.com',
    clientSecret: 'u_ReuHgIeknL_78IIgtdH0KM',
    callbackURL: 'http://localhost:8080/api/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    var info = {
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos ? profile.photos[0].value : undefined
    };
    User.findOrCreate({
      where: {googleId: profile.id},
      defaults: info
    })
    .spread(function (user) {
      done(null, user);
    })
    .catch(done);
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(function (user) {
    done(null, user);
  })
  .catch(done);
});

module.exports = router;
