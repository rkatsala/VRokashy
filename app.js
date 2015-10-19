var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes');

var app = express();

// connection to mongodb
mongoose.connect('mongodb://localhost/vrokashy');
mongoose.connection.on('error', console.error);
mongoose.connection.on('connected', function() {
  console.log('Connected to DB');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'SmallIsBeautiful',
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({ 
    mongooseConnection: mongoose.connection,
    touchAfter: 24 * 3600
  })
}));

// session test
app.use(function(req, res, next) {
  req.session.views = req.session.views + 1 || 1;
  next();
});

// routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



if (module.parent) {
  module.exports = app;
} else {
  var msg = "\nPlease, run the app like this:\n"
    + "npm start \n" 
    + "or\n"
    + "node ./bin/www";
  
  console.log(msg);
}
