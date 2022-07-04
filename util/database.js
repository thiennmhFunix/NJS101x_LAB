const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "node-complete",
	password: "nmht@2021MMO",
});

module.exports = pool.promise();
