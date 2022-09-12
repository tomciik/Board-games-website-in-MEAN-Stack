var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var User = require('./utils/db-users.js');
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var boardRouter = require('./routes/list');
var categorieRouter = require('./routes/categories');
var priceRouter = require('./routes/price');
var registerRouter = require('./routes/register')
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var userRouter = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'stud234',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());

app.use(passport.session());

var checkAuthentication = function(req, res, next){
  if(req.isAuthenticated()){
    console.log("Uwierzytelniony");
    next();
  } else{
    console.log("Nie uwierzytelniony");
    res.redirect("/login");
  }
}

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Niepoprawny login.' });
      }
      if (!user.validPassword(password)) {
         return done(null, false, { message: 'Niepoprawne hasło.' });
      }
      if (!user.accountActivate()) {
        return done(null, false, { message: 'Konto nieaktywne.' });
      }
      return done(null, user);
    });
  }
 ));

app.use('/', indexRouter);
app.use('/list', checkAuthentication, boardRouter);
app.use('/categories', checkAuthentication, categorieRouter);
app.use('/price', checkAuthentication, priceRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', checkAuthentication, logoutRouter);
app.use('/users', checkAuthentication, userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;