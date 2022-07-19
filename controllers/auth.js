const bcrypt = require("bcryptjs");

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
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				return res.redirect("/login");
			}
			// bcrypt function is async
			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save(() => {
							// async wait for done process then proceed
							res.redirect("/");
						});
					}
					res.redirect("/login");
				})
				.catch((err) => {
					console.log(err);
					res.redirect("login");
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
			return (
				bcrypt
					.hash(password, 12)
					// 12 is number of rounds to hash password. More rounds is more secure
					.then((hashedPassword) => {
						const user = new User({
							email: email,
							password: hashedPassword,
							cart: { items: [] },
						});
						return user.save();
					})
					.then((result) => {
						res.redirect("/login");
					})
			);
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
