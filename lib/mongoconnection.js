/**
 * Sets the database connection using mongoose.
 * @module lib/mongoconnection
 * @type {exports}
 */

var mongoose = require('mongoose');
var config = require('./../config/config');
var db = mongoose.connection;
var connectionInstance;
// console.log("connect>>>>", connectionInstance)
//if already we have a connection, don't connect to database again
if(connectionInstance) {
	module.exports = connectionInstance;
	return;
}
//connect to the db - host:port/dbName , without db authentication
//connectionInstance  = mongoose.connect('mongodb://'+ config.MONGO_HOST +':'+ config.MONGO_PORT +'/'+ config.MONGO_DBNAME); 
// if (config.ENV == 'production') {
//      connectionInstance  = mongoose.connect('mongodb://'+ config.MONGO_HOST +'/'+ config.MONGO_DBNAME,{replset:'p'});
// } else {
// 	 connectionInstance  = mongoose.connect('mongodb://'+ config.MONGO_HOST +'/'+ config.MONGO_DBNAME);
// }

connectionInstance = mongoose.connect(config.DB_URL, { useNewUrlParser: true })

//error connecting to db
db.on('error', function (err) {
	console.log("err", err)
	if(err) {
		throw err;
	}
});
//db connected
db.once('open', function() {
	console.log("MongoDb connected successfully, date is = "+new Date());
});

//export the db connection
module.exports = connectionInstance;
var logDebug = config.MONGO_LOG_VERBOSE || false;
mongoose.set('debug', logDebug);
	