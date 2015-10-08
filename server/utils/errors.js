'use strict';

exports.NotFoundError = function NotFound(m) {
  Error.call(this);
  Error.captureStackTrace(this, NotFound);
  this.message = m ? m + ' not found' : 'Not found';
  this.name = 'NotFoundError';
  this.status = 404;
  return this;
};

exports.BadServerResponseError = function BadServerResponseError(message) {
  Error.call(this);
  Error.captureStackTrace(this, BadServerResponseError);
  this.message = message;
  this.name = 'BadServerResponseError';
  this.status = 500;
  return this;
};
