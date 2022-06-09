const fs = require("fs");

function requestHandler(req, res) {
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
		const body = [];

		// req.on is an event listener
		req.on("data", (chunk) => {
			console.log(chunk); // <Buffer 6d 65..>
			body.push(chunk);
		});

		return req.on("end", () => {
			const parsedBody = Buffer.concat(body).toString(); // message=vvvv
			const message = parsedBody.split("=")[1]; // vvvv
			fs.writeFile("message.txt", message, (err) => {
				res.statusCode = 302;
				res.setHeader("location", "/");
				return res.end();
			});
		});
	}
	res.setHeader("Content-Type", "text/html");
	res.write("<html>");
	res.write("<head><title>Title</title></head>");
	res.write("<body><h1>Hello from my Node.js server!</h1></body>");
	res.write("</html>");
	res.end();
}

module.exports = {
	handler: requestHandler,
	someText: "Some hard coded text",
};

// module.exports.handler = requestHandler;
// exports.handler = requestHandler;
