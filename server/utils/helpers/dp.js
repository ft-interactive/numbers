'use strict';

const Handlebars = require('handlebars');

module.exports = function (text, dp) {

  let html = '';
  let num = text;

  if (typeof text !== 'number') {
    if (!text) {
      return ''
    } else {
      num = Number(text);
    }
  }

  if (Number.isNaN(num)) {
    return text;
  }

  if (Number.isInteger(num)) {
    return num.toFixed(0);
  }

  return num.toFixed(dp || 0).replace(/(?![1-9])0+$/, '');
};
