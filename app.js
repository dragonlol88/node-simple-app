const express     = require('express');
const bodyParser  = require('body-parser');
const log         = require('./logger').express;

/**
 * App
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', require('./routes/api/main'));


app.use(function (err, req, res, next) {

	let payload = {
		error: {
			code:    err.status,
			message: err.public ? err.message : 'Internal Error'
		}
	};

	if (process.env.NODE_ENV === 'development' || (req.baseUrl + req.path).includes('nginx/certificates')) {
		payload.debug = {
			stack:    typeof err.stack !== 'undefined' && err.stack ? err.stack.split('\n') : null,
			previous: err.previous
		};
	}
                            
	// Not every error is worth logging - but this is good for now until it gets annoying.
	if (typeof err.stack !== 'undefined' && err.stack) {
		if (process.env.NODE_ENV === 'development' || process.env.DEBUG) {
			log.debug(err.stack);
		} else if (typeof err.public == 'undefined' || !err.public) {
			log.warn(err.message);
		}
	}

	res
		.status(err.status || 500)
		.send(payload);
});
module.exports = app;
