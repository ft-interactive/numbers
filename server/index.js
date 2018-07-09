'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const responseTime = require('response-time');
const view = require('./utils/view');
const enrouten = require('express-enrouten');
const app = express();
const gtg = require('./gtg');
const health = require('./health');

app.locals.site = require('./site');
app.locals.is_prod = app.get('env') === 'production';

app.set('port', process.env.PORT);
app.set('x-powered-by', false);
app.enable('trust proxy');

view.setup(app);

if (app.get('env') === 'development') {
  app.use(logger('dev'));
}

app.use(responseTime());

if (app.get('env') === 'development') {
  app.use(require('connect-browser-sync')(require('browser-sync')({
    files: ['views/**/*', 'public/**/*'],
    logSnippet: false,
    reloadOnRestart: true,
    reloadDelay: 300,
    open: false,
    notify: false
  })));
}

app.use('/__access_metadata', (req, res) => {
  res.send({
    access_metadata: [
      {
        path_regex: '.*',
        classification: 'unconditional'
      }
    ]
  });
});

app.use('/__gtg', gtg.middleware);
app.use('/__health', health.middleware);

app.use('/sites/numbers/google65d63e0f29bae338.html', (req, res, next) => {
  res.type('html');
  res.status(200).send('google-site-verification: google65d63e0f29bae338.html');
});

app.use('/sites/numbers', enrouten({
  index: 'controllers/',
  directory: 'controllers'
}));

const static_options = app.get('env') === 'development' ? {
  etag:false,
  maxAge: 0
} : {
  etag: false,
  maxAge: '1y',
  lastModified: false,
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', 'https://ig.ft.com');
  }
};

app.use(express.static('public', static_options));
app.use('/sites/numbers-static/', express.static('public', static_options));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user

var messages = {
  404: 'Not Found',
  500: 'Server Error'
};

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status);
  res.render('error', {
    message: messages[status],
    error: {}
  });
});


module.exports = app;
