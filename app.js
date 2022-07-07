// import globally module that Nodejs ships
const http = require("http");
const path = require("path");
const rootDir = require("./util/path");

const express = require("express");
const parser = require("body-parser");

const errorController = require("./controllers/error");

const mongoConnect = require("./util/database").mongoConnect;

const User = require("./models/user");

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
	User.findByPk("62c71c8ed6a839870aef4b09")
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

mongoConnect(() => {
	app.listen(3000);
});
