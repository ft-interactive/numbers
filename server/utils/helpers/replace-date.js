'use strict';

const Handlebars = require('handlebars');

var long_months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
]

var short_months = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'
];

module.exports = function (date, string) {

  if (!(date instanceof Date)) return new Handlebars.SafeString(string);

  var result = string;

  if (result.indexOf('QQ') !== -1) {
    result = result.replace('QQ', 'Q' + get_quarter(date));
  }

  if (result.indexOf('MONTH') !== -1) {
    result = result.replace('MONTH', long_months[date.getUTCMonth()]);
  }

  if (result.indexOf('MM') !== -1) {
    result = result.replace('MM', short_months[date.getUTCMonth()]);
  }

   if (result.indexOf('YYYY') !== -1) {
    result = result.replace('YYYY', date.getUTCFullYear());
  }

  return new Handlebars.SafeString(result);
};

function get_quarter(date) {
  return Math.ceil((date.getUTCMonth() + 1) / 3);
}
