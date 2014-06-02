

exports.addRoutes = function (app) {
	
	app.get("/gag/:category/:page?/:limit?", function (req, res) {
		res.send("Server working ...");
	});

}