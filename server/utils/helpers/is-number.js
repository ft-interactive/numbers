'use strict';

module.exports = function (value, options) {
  return typeof value === 'number' ? options.fn(this) : options.inverse(this);
};
