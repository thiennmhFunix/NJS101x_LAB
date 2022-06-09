// import globally module that Nodejs ships
const http = require("http");

const express = require("express");

// create app by running express function
const app = express();

// using use function of express as a middleware function
app.use("/", (req, res, next) => {
	console.log("First always run!");
	next();
});

app.use("/add-product", (req, res, next) => {
	console.log("Middleware 1 activated!");
	res.send("<h1>The 'Add Product' Page</h1>");
});

app.use("/", (req, res, next) => {
	console.log("Middleware 2 activated!");
	res.send("<h1>Hello from Express!</h1>");
});

// create a server
app.listen(3000);
