'use strict';

const Handlebars = require('handlebars');

const long_months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
]

const short_months = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'
];

const short_days = [
	'Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'
];

module.exports = function (date, string) {

  if (!(date instanceof Date)) return new Handlebars.SafeString(string);

  let result = string;

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
	
	if (result.indexOf('DAY') !== -1) {
		result = result.replace('DAY', short_days[date.getUTCDay()]);
	}
	
	if (result.indexOf('DD') !== -1) {
		result = result.replace('DD', date.getUTCDate());
	}

  return new Handlebars.SafeString(result);
};

function get_quarter(date) {
  return Math.ceil((date.getUTCMonth() + 1) / 3);
}
