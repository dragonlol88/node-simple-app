const { Model } = require('objection');
const db = require('../db')


Model.knex(db);

class User extends Model {
    
    $beforeInsert () {
		this.created_on  = new Date().toISOString();
		this.modified_on = new Date().toISOString();
	}

	$beforeUpdate () {
		this.modified_on = new Date().toISOString();
	}

    static get name () {
		return 'User';
	}

    static get tableName() {
      return 'user';
    }
    
    static get idColumn() {
        return 'id';
      }

    static get jsonAttributes () {
		return ['name', 'age'];
	}

}

module.exports = User;