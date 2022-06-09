// import globally module that Nodejs ships
const http = require("http");

const express = require("express");
const parser = require("body-parser");

// create app by running express function
const app = express();

// define routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(adminRoutes);
app.use(shopRoutes);

// using use function of express as a middleware function
app.use(parser.urlencoded({ extended: false }));

// create a server
app.listen(3000);
