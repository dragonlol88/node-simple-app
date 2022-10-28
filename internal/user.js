const User = require('../models/user');

const internalUser = {

	/**
	 * @param   {Object}  data
	 * @returns {Promise}
	 */
	create: (data) => {
        return User.query().insertAndFetch(data);
	},

	/**
	 * @param   {Object}  data
	 * @returns {Promise}
	 */
    	getById: (id) => {
        	return User.query().findById(id)
    	}
}

module.exports = internalUser;
