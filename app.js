// import globally module that Nodejs ships
const http = require("http");
const fs = require("fs");

// create a server that executes specific tasks
const server = http.createServer((req, res) => {
	const url = req.url;
	const method = req.method;

	// if homepage then show this
	if (url === "/") {
		res.write(`
			<html>
				<head>
					<title>Message</title>
				</head>
				<body>
					<form action="/message" method="POST">
						<input type="text" name="message">
						<button type="submit">Send</button>
					</form>
				</body>
			</html>`);
		return res.end();
	}

	if (url === "/message" && method === "POST") {
		fs.writeFileSync("message.txt", "DUMMY");
		res.statusCode = 302;
		res.setHeader("location", "/");
		return res.end();
	}
	res.setHeader("Content-Type", "text/html");
	res.write("<html>");
	res.write("<head><title>Title</title></head>");
	res.write("<body><h1>Hello from my Node.js server!</h1></body>");
	res.write("</html>");
	res.end();
});

// keep nodejs not shut down server but keep server alive listening
// listen method takes port to track any incoming request into this port, default port 80
// listen method takes hostname, default machine name => local machine => localhost
server.listen(3000);
