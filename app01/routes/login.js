var express = require('express');
var router = express.Router();
var passport = require('passport');
var app = ('../app.js');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/logowanie',
    passport.authenticate('local',
    { 
        failureRedirect: '/login' }
    ),
    function(req, res)
    {
      console.log(req.user);
      res.redirect('/');
    }
);

module.exports = router