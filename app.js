var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('events').EventEmitter.defaultMaxListeners = 100;

var indexRouter = require('./routes/index');
var storeRouter = require('./routes/store');
var dealsRouter = require('./routes/deals');
var categoriesRouter = require('./routes/categories');
var apiRouter = require('./routes/api');
const settingsMiddleware = require('./middleware/settings');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Important: cookie-parser should be used before any routes
app.use(cookieParser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Development headers
if (app.get('env') === 'development') {
  app.use((req, res, next) => {
    res.set({
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store'
    });
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
}

// Add the settings middleware before your routes
app.use(settingsMiddleware);

// Routes
app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use('/store', storeRouter);
app.use('/deals', dealsRouter);
app.use('/categories', categoriesRouter);

// Error handlers
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  process.exit(0);
});

module.exports = app;
