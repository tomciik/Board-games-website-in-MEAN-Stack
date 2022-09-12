var express = require('express');
var router = express.Router();
var Boards = require('../utils/db.js');

router.get('/',  function(req, res, next) {
    Boards.find(function (err, docs) {
      if (err) return next(err);
      res.render('price', {boards: docs, u: req.user});
    });
});

module.exports = router;