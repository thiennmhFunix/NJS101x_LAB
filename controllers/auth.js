const User = require("../models/user");

exports.getLogin = (req, res, next) => {
	const isLoggedIn = req.get("Cookie").split("=")[1];
	res.render("auth/login.ejs", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: isLoggedIn,
	});
};

exports.postLogin = (req, res, next) => {
	User.findById("62d59cff3784242137091e84")
		.then((user) => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			res.redirect("/");
		})
		.catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(() => {
		res.redirect("/");
	});
};
