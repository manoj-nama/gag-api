var express = require('express');
var appRouter = require("./config/URLMappings");
var logger = require("morgan");
var AppBuilder = require("./custom_modules/AppBuilder");
var bodyParser = require("body-parser");

var config = require("./config/Config.json");

var app = express();
app.use(logger('dev'));
app.use(bodyParser());

GLOBAL._config = config;
GLOBAL._appBaseDir = __dirname;

AppBuilder.initServices();

appRouter.addRoutes(app);


app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8888, function () {
	console.log("Server Listening on port", process.env.PORT || 8888);
});