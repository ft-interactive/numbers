'use strict';

const debug = require('debug')('nums:server');
const express = require('express');
const http = require('http');
const app = require('./server');
const health = require('./server/health');

process.env.PORT = normalizePort(process.env.PORT || 3000);
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(process.env.PORT);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  health.ok = false;

  var port = process.env.PORT;
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  health.ok = true;
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
