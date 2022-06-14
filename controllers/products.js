const products = [];

exports.getAddProduct = (req, res, next) => {
	res.render("add-product.ejs", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
	});
};

exports.postAddProduct = (req, res, next) => {
	products.push({
		title: req.body.title,
		activeAddProduct: true,
		mainCSS: true,
	});
	res.redirect("/");
};

exports.getProducts = (req, res, next) => {
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
