var express = require('express');
var router = express.Router();
var Boards = require('../utils/db.js');

/* GET /list */
router.get('/',  function(req, res, next) {
  Boards.find(function (err, docs) {
    if (err) return next(err);
    res.render('boardgame', {boards: docs, u: req.user});
  });
});

/* POST /list */
router.post('/', function(req, res, next) {
  Boards.create(req.body, function (err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});

/* PUT /list/:id */
router.put('/:id', function(req, res, next) {
  Boards.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});

/* DELETE /list/:id */
router.delete('/:id', function(req, res, next) {
  Boards.findByIdAndRemove(req.params.id, function (err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});

module.exports = router;