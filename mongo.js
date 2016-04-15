'use strict';

var client = require('mongodb').MongoClient;
var connectionString = require('config').get('mongodb.host');
var db, callback;

client.connect(connectionString, function(err, database) {
    if (err) throw err;

    console.log('MongoDB running on ' + (process.env.NODE_ENV || 'development') + ' environment');

    database.on('error', function(err) {
        throw err;
    });
    db = database;
    if( typeof callback == 'function' ){
        callback(db);
    }
});


module.exports = function(cb){
    if(typeof db != 'undefined'){
        cb(db); // If db is already defined, don't wait.
    } else {
        callback = cb;
    }
}