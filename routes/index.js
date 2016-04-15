var express = require('express');
var router = express.Router();
var dbModule = require('../mongo');
dbModule(function(db){
  //Here code using db;
  db.listCollections()
      .toArray()
      .then(function(items) {
        console.log(items);
      });
});
console.log('route index', process.env.db);


/* GET home page. */
router.get('/', function(req, res, next) {
  dbModule(function(db) {
    db.listCollections()
        .toArray()
        .then(function(items) {
          return res.send(items);
        });
  });
});

router.get('/hello', function(req, res, next) {
  dbModule(function(db) {
    var collection = db.collection('events');
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
