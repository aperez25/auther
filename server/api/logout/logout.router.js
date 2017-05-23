var router = require('express').Router();

router.get('/', function (req, res, next) {
	req.session.userId = null;
	console.log(req.session)
	res.status(200);
});

module.exports = router;
