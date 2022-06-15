const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("shop/product-list.ejs", {
			prods: products,
			pageTitle: "All Products",
			path: "/products",
		});
	});
};

exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId, (product) => {
		res.render("shop/product-detail.ejs", {
			product: product,
			pageTitle: product.title,
			path: "/products",
		});
	});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render("shop/index.ejs", {
			prods: products,
			pageTitle: "Shop",
			path: "/",
		});
	});
};

exports.getCart = (req, res, next) => {
	res.render("shop/cart.ejs", {
		path: "/cart",
		pageTitle: "Your Cart",
	});
};

exports.getOrders = (req, res, next) => {
	res.render("shop/orders.ejs", {
		path: "/orders",
		pageTitle: "Your Orders",
	});
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout.ejs", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};
