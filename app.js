// import globally module that Nodejs ships
const http = require("http");

const express = require("express");
const parser = require("body-parser");

// create app by running express function
const app = express();

// using use function of express as a middleware function
app.use(parser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
	res.send(
		"<form action='/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
	);
});

app.use("/product", (req, res, next) => {
	console.log(req.body);
	res.redirect("/");
});

app.use("/", (req, res, next) => {
	res.send("<h1>Hello from Express!</h1>");
});

// create a server
app.listen(3000);
