'use strict';

module.exports = function (options) {
  try {
    return encodeURIComponent(JSON.stringify(JSON.parse((options.fn(this) || '')), null, ''));
  } catch (e) {
    return '';
  }
};
