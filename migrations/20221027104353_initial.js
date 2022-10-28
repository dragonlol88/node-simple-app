const migrate_name = 'initial-schema';
const logger       = require('../logger').migrate;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    logger.info('[' + migrate_name + '] Migrating Up...');

    return knex.schema.createTableIfNotExists('user', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('age');
        table.date('created_on');
        table.date('modified_on');
      }
  )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    logger.warn('[' + migrate_name + '] You can\'t migrate down the initial data.');
	return Promise.resolve(true);
};
