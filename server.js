/*jslint node: true */
"use strict";  

var http = require('http');
var config = require('./config/config');
var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var timeout = require('connect-timeout');
var _portSocket = config.APP_PORT;
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(timeout('200s'))


app.use(bodyParser.urlencoded({ limit: '50mb', 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb' })); // parse application/json
app.use(bodyParser.json({ limit: '50mb', type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(haltOnTimedout)
app.use(cookieParser())
app.use(haltOnTimedout)


// handle app level errors
app.use(function(err, req, res, next) {
    console.error(err.stack);
    return res.status(500).send('Something broke!');
});

// handle app level errors
var errorFilter = function(err, req, res, next) {
    if (!res.headersSent) { //just because of your current problem, no need to exacerbate it.
        var errcode = err.status || 500; //err has status not statusCode
       // var msg = err.message || 'server error!';
        res.status(errcode).send(err); //the future of send(status,msg) is hotly debated
    };
}


function haltOnTimedout(req, res, next) {
    if (!req.timedout)
        next();
}



require('./lib/mongoconnection');
require('./src/routes/index')(app);
app.use(errorFilter);

var server = http.createServer(app);
server.listen((process.env.PORT || 8080), function () {
	var port = server.address().port;
	console.log("App now running on port", port);
})
