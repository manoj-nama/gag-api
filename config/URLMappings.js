var controllers = {
	GagController: require('../controllers/GagController')
};

exports.addRoutes = function (app) {
	app.get("/gag/:category/:paging?", controllers.GagController.serve);
}