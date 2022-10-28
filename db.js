const config = require('config')

if (!config.has('database')) {
	throw new Error('Database config does not exist');
}

function createDbConfig() {
    return config.database.knex
}

console.log(createDbConfig())
let data = createDbConfig();

if (typeof config.database.version !== 'undefined') {
	data.version = config.database.version;
}


module.exports   = require('knex')(data);