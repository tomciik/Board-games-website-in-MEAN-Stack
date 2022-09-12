var express = require('express');
var router = express.Router();
var Boards = require('../utils/db.js');

router.get('/strategy',  function(req, res, next) {
    Boards.find(function (err, docs) {
      if (err) return next(err);
      res.render('strategy', {boards: docs, u: req.user});
    });
});

router.get('/adventure',  function(req, res, next) {
    Boards.find(function (err, docs) {
      if (err) return next(err);
      res.render('adventure', {boards: docs, u: req.user});
    });
});

router.get('/economic',  function(req, res, next) {
    Boards.find(function (err, docs) {
      if (err) return next(err);
      res.render('economic', {boards: docs, u: req.user});
    });
});

router.get('/party',  function(req, res, next) {
    Boards.find(function (err, docs) {
      if (err) return next(err);
      res.render('party', {boards: docs, u: req.user});
    });
});

router.get('/logic',  function(req, res, next) {
    Boards.find(function (err, docs) {
      if (err) return next(err);
      res.render('logic', {boards: docs, u: req.user});
    });
});

module.exports = router;