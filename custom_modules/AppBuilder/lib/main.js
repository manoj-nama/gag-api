var fs = require('fs');
var path = require('path');

exports.initServices = function () {
    try {
        var list = fs.readdirSync(path.join(_appBaseDir, "services"));
        list.forEach(function (item) {
            var name = item.toString().replace(/\.js$/, "");
            var service = require(path.join(_appBaseDir, "services", name));
            Object.defineProperty(global, name, {
                get: function () {
                    return service;
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
};


exports.apiHelperToolInjectionMiddleware = function (req, res, next) {
    function sendResponse(dataObj, headers, status) {
        if (Boolean(status)) status = parseInt(status, 10);
        else status = 200;
        headers = headers || {};
        dataObj["status"] = status;
        headers["Content-Type"] = Boolean(req.param('callback')) ? 'text/javascript' : 'application/json';
        res.writeHead(status, headers);
        if (Boolean(req.param('callback'))) {
            res.end(req.param('callback') + "(" + JSON.stringify(dataObj) + ")");
        } else {
            res.end(JSON.stringify(dataObj));
        }
    }

    res.sendErrorResponse = function (message, status, headers) {
        sendResponse({
            error: message
        }, headers, status);
    };
    res.sendSuccessResponse = function (data, status, headers) {
        if (typeof(data) == 'string' || data instanceof String) {
            data = {message: data};
        }
        sendResponse(data, headers, status);
    };
    req.setDefaultParams = function (map) {
        Object.keys(map).forEach(function (key) {
            if (req.param(key) == null || typeof(req.param(key)) == 'undefined') req.params[key] = map[key] + "";
        });
    };
    next();
};


//Add a emitter transform for functions.
Function.prototype.toEmitter = function () {
    var origFunc = this;
    return function () {
        var args = arguments;
        var emitter = new process.EventEmitter();
        process.nextTick(function () {
            origFunc.apply(emitter, args);
        });
        return emitter;
    }
};