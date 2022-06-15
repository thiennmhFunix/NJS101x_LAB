const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("add-product.ejs", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		activeAddProduct: true,
		mainCSS: true,
	});
};

exports.postAddProduct = (req, res, next) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect("/");
};

exports.getProducts = (req, res, next) => {
	const products = Product.fetchAll();
	res.render("shop.ejs", {
		prods: products,
		pageTitle: "My Shop",
		path: "/",
		hasProducts: products.length > 0,
		activeShop: true,
		mainCSS: true,
		productCSS: true,
	});
};
