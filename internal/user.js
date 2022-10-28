const User = require('../models/user');

const internalUser = {

	/**
	 * @param   {Access}  access
	 * @param   {Object}  data
	 * @returns {Promise}
	 */
	create: (data) => {
        return User.query().insertAndFetch(data);
	},
    getById: (id) => {
        return User.query().findById(id)
    }
}

module.exports = internalUser;
