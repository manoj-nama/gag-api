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