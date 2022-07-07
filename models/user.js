const mongodb = require("mongodb");
const { getDb } = require("../util/database");

const ObjectId = mongodb.ObjectId;

const db = require("../util/database").getDb;

class User {
	constructor(username, email) {
		this.name = username;
		this.email = email;
	}

	save() {
		const db = getDb();
		db.collection("user").insertOne(this);
	}

	static findByPk(userId) {
		const db = getDb();
		db.collection("user").findOne({ _id: new ObjectId(userId) });
	}
}

module.exports = User;
