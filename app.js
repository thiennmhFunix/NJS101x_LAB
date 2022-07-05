// import globally module that Nodejs ships
const http = require("http");
const path = require("path");
const rootDir = require("./util/path");

const express = require("express");
const parser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product"); // to add relation
const User = require("./models/user"); // to add relation

// create app by running express function
const app = express();

// tell express the templating engine
app.set("view-engine", "ejs");
app.set("views", "views");
// app.set("view-engine", "pug");
// app.set("view-engine", "hbs");

// define routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// using use function of express as a middleware function
app.use(parser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
	User.findByPk(1)
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// add relation between tables DB
Product.belongsTo(User, {
	constraint: true,
	onDelete: "CASCADE",
});

User.hasMany(Product);

// sync DB while starting server
sequelize
	// .sync({ force: true })
	.sync()
	.then((result) => {
		return User.findByPk(1);
		// console.log(result);
		// create a server
	})
	.then((user) => {
		if (!user) {
			return User.create({ name: "Max", email: "test@test.com" });
		}
		return user;
	})
	.then((user) => {
		// console.log(user);
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});
