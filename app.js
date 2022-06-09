// import globally module that Nodejs ships
const http = require("http");

const express = require("express");

// create app by running express function
const app = express();

// using use function of express as a middleware function
app.use((req, res, next) => {
	console.log("Middleware 1 activated!");
	next();
});

app.use((req, res, next) => {
	console.log("Middleware 2 activated!");
	res.send("<h1>Hello from Express!</h1>");
});

// create a server that executes specific tasks
const server = http.createServer(app);

// keep nodejs not shut down server but keep server alive listening
// listen method takes port to track any incoming request into this port, default port 80
// listen method takes hostname, default machine name => local machine => localhost
server.listen(3000);
