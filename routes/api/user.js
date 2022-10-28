const express        = require('express');
const internalUser   = require('../../internal/user')

const router = express.Router()


router
    .route('/')
    
    .options((req, res) => {
		res.sendStatus(204);
	})
    
    .post((req, res, next) => {
        return internalUser.create(req.body)
                    .then((result) => {
                        res.status(201)
                            .send(result);
                    })
                    .catch(next);

    });


router
	.route('/:userId')
	
    .options((req, res) => {
		res.sendStatus(204);
	})

    .get((req, res, next) => {
        return internalUser.getById(req.params.userId)
                    .then((result) => {
                        res.status(200)
                            .send(result);
                    })
                    .catch(next);

    });

module.exports = router;