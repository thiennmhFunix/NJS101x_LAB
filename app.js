// import globally module that Nodejs ships
const http = require("http");
const path = require("path");
const rootDir = require("./util/path");

const express = require("express");
const parser = require("body-parser");
// require handlebars templating engine
const expressHbs = require("express-handlebars");

// create app by running express function
const app = express();

// tell express the templating engine
app.engine("hbs", expressHbs());

// app.set("view-engine", "pug");
app.set("view-engine", "hbs");
app.set("views", "views");

// define routes
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// using use function of express as a middleware function
app.use(parser.urlencoded({ extended: false }));

app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
	res.status(404).render("404.pug", { pageTitle: "Page Not Found" });
});

// create a server
app.listen(3000);
