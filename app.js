var express = require('express');
var appRouter = require("./config/URLMappings");
var logger = require("morgan");
var bodyParser = require("body-parser");

var config = require("./config/Config.json");

var app = express();
app.use(logger('dev'));
app.use(bodyParser());

appRouter.addRoutes(app);

GLOBAL._config = config;

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8888, function () {
	console.log("Server Listening on port", process.env.PORT || 8888);
});