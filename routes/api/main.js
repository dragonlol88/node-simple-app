const express = require('express');
const pjson   = require('../../package.json');
const error   = require('../../lib/error');

let router = express.Router({
	caseSensitive: true,
	strict:        true,
	mergeParams:   true
});

/**
 * Health Check
 * GET /api
 */
router.get('/', (req, res/*, next*/) => {
	let version = pjson.version.split('-').shift().split('.');

	res.status(200).send({
		status:  'OK',
		version: {
			major:    parseInt(version.shift(), 10),
			minor:    parseInt(version.shift(), 10),
			revision: parseInt(version.shift(), 10)
		}
	});
});

router.use('/users', require('./user'));


/**
 * API 404 for all other routes
 *
 * ALL /api/*
 */
router.all(/(.+)/, function (req, res, next) {
	req.params.page = req.params['0'];
	next(new error.ItemNotFoundError(req.params.page));
});

module.exports = router;