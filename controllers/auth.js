const User = require("../models/user");

exports.getLogin = (req, res, next) => {
	res.render("auth/login.ejs", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: false,
	});
};

exports.getSignup = (req, res, next) => {
	res.render("auth/signup.ejs", {
		path: "/signup",
		pageTitle: "Signup",
		isAuthenticated: false,
	});
};

exports.postLogin = (req, res, next) => {
	User.findById("62d59cff3784242137091e84")
		.then((user) => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			req.session.save(() => {
				// async wait for done process then proceed
				res.redirect("/");
			});
		})
		.catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	// ignore validate atm
	// check if email has already signup
	User.findOne({ email: email })
		.then((userDoc) => {
			if (userDoc) {
				return res.redirect("/signup");
			}
			const user = new User({
				email: email,
				password: password,
				cart: { items: [] },
			});
			return user.save();
		})
		.then((result) => {
			res.redirect("/login");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(() => {
		res.redirect("/");
	});
};
