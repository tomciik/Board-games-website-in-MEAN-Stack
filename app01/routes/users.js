var express = require('express');
const sha2 = require('sha2').SHA256;
var router = express.Router();
var User = require('../utils/db-users.js');

// lista wszystkich użytkowników w bazie
router.get('/', function(req, res) {
  User.find(function (err, data) {
    if (err) return console.error(err);
    res.json(data);
  })
});

// resetowanie zawartości kolekcji użytkowników
router.get('/reset', function(req, res, next) {
  User.remove({}, function (err) {
    if (err) return handleError(err);
    var admin = new User({"username":"admin", "password":sha2("stud234").toString("hex"), "email":"admin@admin.com", "active":"true", "admin": true});
    var asdf  = new User({"username":"asdf",  "password":sha2("asdf").toString("hex"), "email":"tomasz.p@gmail.com", "active":"false" });

    // create two users: 'admin' and 'asdf'
    admin.save((err,data)=>{
      if (err) return console.error(err);
      asdf.save(function(err,data2) {
        if (err) return console.error(err);
        res.send("<h3>Utworzeni użytkownicy:</h3>" + data + " <br> " + data2);
      })
    });
  });
});


module.exports = router;