var express = require('express');

var path     = require('path');
var favicon  = require('serve-favicon');
var logger   = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var session  = require('express-session');
var flash    = require('connect-flash');
var expressValidator  = require('express-validator');
var moment = require('moment');

var index         = require('./routes/index');
var about         = require('./routes/about');
var signup        = require('./routes/signup');
var profile       = require('./routes/profile');
var login         = require('./routes/login');
var logout        = require('./routes/logout');
var total_costs   = require('./routes/total_costs');
var content_management   = require('./routes/content_management');
var history   = require('./routes/history');

var planning_supplies   = require('./routes/planning_supplies');
var transportation      = require('./routes/transportation');

require('./config/db.js');
require('./config/location');
require('./config/passport')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.use(session({ secret: 'SessionSecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use('/', index);
app.use('/about', about);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/profile', profile);
app.use('/planning_supplies', planning_supplies);
app.use('/total_costs', total_costs);
app.use('/transportation', transportation);
app.use('/content_management', content_management);
app.use('/history', history);

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

app.locals.formatDate = function(date){
  return moment(date).format('M.D.YYYY г. в h:mm');
};

module.exports = app;
