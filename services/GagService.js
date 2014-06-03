var request = require('request');

exports.serve = function (category, pageId) {
	var emitter = this;
	request({
		method: "GET",
		url	: _config.common.infinigag.url + category + "/" + pageId,
		json: true
	}, function(err, response, body) {
		if(err) {
			emitter.emit("ERROR", err);
		} else {
			emitter.emit("DONE", body);
		}
	});
}.toEmitter();