var express = require('express');
var router = express.Router();
var dbModule = require('../mongo');

/* GET users listing. */
router.get('/', function(req, res, next) {
    dbModule(function(db) {
        var collection = db.collection('logs');
        collection.find({}).toArray(function(err, docs) {
            if(err) {
                res.json(err);
                return;
            }
            return res.json(docs);
        });
    });
});

module.exports = router;
