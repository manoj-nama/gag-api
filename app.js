var express = require('express');
var appRouter = require("./config/URLMappings");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();
app.use(logger('dev'));
app.use(bodyParser());

appRouter.addRoutes(app);

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8888);