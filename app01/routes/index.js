var express = require('express');
var router = express.Router();
var User = require('../utils/db-users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Planszówki', u: req.user});
});

router.get('/activate/:id', function(req, res, next) {
  User.findByIdAndUpdate( req.params.id, { $set:{active:true} },
                          {new: false}, function(err, data) {
    res.send("Aktywacja konta użytkownika: " + req.params.id + " ### " + data);
  });
});

module.exports = router;