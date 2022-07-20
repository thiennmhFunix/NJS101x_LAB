const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

// [] is not a must, used for better tracking code
// validator will process in order from head to tail as listed in router post
router.post(
	"/signup",
	[
		check("email")
			.isEmail()
			.withMessage("Please enter a valid email.")
			// custom validator
			.custom((value, { req }) => {
				if (value === "name0@mail.com") {
					throw new Error("This email address is not allowed.");
				}
				return true;
			}),
		body(
			"password",
			"Please enter a password with only numbers and text and at least 5 characters."
		)
			.isLength({ min: 5 })
			.isAlphanumeric(),
	],
	authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
