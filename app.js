// import globally module that Nodejs ships
const http = require("http");

const express = require("express");

// create app by running express function
const app = express();

// create a server that executes specific tasks
const server = http.createServer(app);

// keep nodejs not shut down server but keep server alive listening
// listen method takes port to track any incoming request into this port, default port 80
// listen method takes hostname, default machine name => local machine => localhost
server.listen(3000);
