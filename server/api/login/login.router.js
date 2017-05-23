var router = require('express').Router();
var User = require('../users/user.model');

router.post('/', function (req, res, next) {
  User.findOne({
	where: req.body
  })
  .then(function (user) {
	if (!user) res.status(401)
	req.session.userId = user.id;
    res.status(200).json(user);
  })
  .catch(next);

});

module.exports = router;
