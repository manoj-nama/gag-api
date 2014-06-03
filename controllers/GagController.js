var request = require('request');

exports.serve = function (req, res) {
	var category = req.params.category || _config.common.infinigag.category;
	var paging = req.params.paging || _config.common.infinigag.paging;
	GagService.serve(category, paging)
		.on("DONE", function (data) {
			res.sendSuccessResponse(data);
		})
		.on("ERROR", function (err) {
			res.sendErrorResponse(err, 404);
		})
};