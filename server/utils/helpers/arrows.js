'use strict';

const Handlebars = require('handlebars');

module.exports = function (text) {

  var html = '';

  if (!text) {
    return '';
  }

  if (text === 'up' || text ==='down') {

    html = '<img src="//ig.ft.com/static/sites/2014/economic-indicators/arrow.svg">';
  } else {
    html = 'no change'
  }

  return new Handlebars.SafeString(html);
};
