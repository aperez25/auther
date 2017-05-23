var router = require('express').Router();
var User = require('../users/user.model');

router.post('/', function (req, res, next) {
  User.create({
	email: req.body.email,
	password: req.body.password
  })
  .then(function (user) {
	req.session.userId = user.id;
    res.status(200).json(user);
  })
  .catch(next);

});

module.exports = router;
