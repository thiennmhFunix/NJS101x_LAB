const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
	MongoClient.connect(
		"mongodb+srv://nmht:nmht@2021MMO@mongodb-test.p8duu.mongodb.net/?retryWrites=true&w=majority"
	)
		.then((client) => {
			console.log("Connected!");
			callback(client);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = mongoConnect;
