/// <reference path="../typings/main.d.ts" />
/*                _       _
                 | |     | |
  _ __   ___   __| |_   _| |_   _ ___
 | '_ \ / _ \ / _` | | | | | | | / __|
 | | | | (_) | (_| | |_| | | |_| \__ \
 |_| |_|\___/ \__,_|\__,_|_|\__,_|___/
 @nodulus open source | ©Roi ben haim  ®2016
 */
"use strict";
var express = require("express");
var consts = require("@nodulus/config").consts;
var config = require("@nodulus/config").config;
var modules = require("@nodulus/modules");
// import * as web from "./webserver";
// import * as network from "./socket";
var Startup = (function () {
    function Startup() {
        var log = require("@nodulus/logs").logger;
        var app = require("@nodulus/core");
        var path = require("path");
        var rest = require("@nodulus/api");
        var io = require("@nodulus/socket")(app.server);
        // var envs = require('envs');
        // 
        // var EventEmitter = require('events').EventEmitter;
        // global.eventServer = new EventEmitter();
        // var app = express();
        // global.express = app;
        // If NODE_ENV is not set, 
        // then this application will assume it's prod by default.
        // app.set('environment', envs('NODE_ENV', 'production'));
        app.use('/', app.static(global.clientAppRoot));
        //load modules
        var nodulus_modules = config.modulesSettings;
        console.log("");
        console.log("***************************************************************************");
        console.log("***__active nodules_____________________________________________________***");
        console.log("***_____________________________________________________________________***");
        for (var _i = 0, _a = Object.keys(nodulus_modules); _i < _a.length; _i++) {
            var name = _a[_i];
            var nodulus_module = nodulus_modules[name];
            try {
                var version = require(name + '/package.json').version;
                console.log("***__ " + name + " " + this.print("_", 55 - name.length) + "**" + version + this.print("_", 8 - version.length) + "***");
                var npmname = name; //nodulus_module.npm;
                if (nodulus_module.routes !== undefined) {
                    for (var x = 0; x < nodulus_module.routes.length; x++) {
                        try {
                            var pathRoute = npmname + '/' + 'routes/' + nodulus_module.routes[x].path;
                            app.use('/' + npmname + nodulus_module.routes[x].route, require(pathRoute));
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                }
                app.use('/' + name, express.static(path.join(process.cwd(), 'node_modules', name, 'public')));
            }
            catch (err) {
                log.error('missing module', err);
            }
        }
        console.log("***_____________________________________________________________________***");
        app.use("/nodulus", require('../routes/nodulus.js'));
        var api = new rest.start(app);
        console.log("***_____________________________________________________________________***");
        // app.use(require("nodulus-run"));
        app.use('/bower_components', express.static(path.join(process.cwd(), 'bower_components')));
        app.use('/client', express.static(path.join(process.cwd(), 'client')));
    }
    Startup.prototype.print = function (char, num) {
        var str = "";
        for (var i = 0; i < num; i++)
            str += char;
        return str;
    };
    return Startup;
}());
exports.Startup = Startup;