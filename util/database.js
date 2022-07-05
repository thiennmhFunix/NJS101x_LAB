const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "nmht@2021MMO", {
	dialect: "mysql",
	host: "localhost",
});

module.exports = sequelize;
