var request = require('request');

exports.serve = function (req, res) {
	var category = req.params.category || _config.common.infinigag.category;
	var paging = req.params.paging || _config.common.infinigag.paging;
	console.log("Requesting: ", _config.common.infinigag.url + category + "/" + paging);
	request({
		method: "GET",
		url	: _config.common.infinigag.url + category + "/" + paging,
		json: true
	}, function(err, response, body) {
		if(!err) {
			res.send(body.data);
		} else {
			res.send(JSON.stringify(err));
		}
	});
};