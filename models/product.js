const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
	constructor(title, price, description, imageUrl, id) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
		this._id = id;
	}

	save() {
		const db = getDb();
		let dbOp; // database operation
		if (this._id) {
			// Update the product if product is existing
			dbOp = db
				.collection("products")
				.updateOne({ _id: new mongodb.ObjectId(prodId) }, { $set: this });
		} else {
			dbOp = db.collection("products").insertOne(this);
		}

		return dbOp
			.then((result) => {
				console.log(result);
			})
			.catch((err) => console.log(err));
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection("products")
			.find()
			.toArray()
			.then((products) => {
				console.log("~ products", products);
				return products;
			})
			.catch((err) => {
				console.log("~ err", err);
			});
	}

	static findByPk(prodId) {
		const db = getDb();
		return db
			.collection("products")
			.find({ _id: new mongodb.ObjectId(prodId) })
			.next()
			.then((product) => {
				console.log("~ products", product);
				return product;
			})
			.catch((err) => {
				console.log("~ err", err);
			});
	}
}

module.exports = Product;
