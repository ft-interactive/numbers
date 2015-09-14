'use strict';

const Handlebars = require('handlebars');

module.exports = function (dateUpdated) {

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var newDate = new Date(dateUpdated);

  if (isNaN(+ newDate)) {
    newDate = null;
  };
    
  var html = '';
  
  if(newDate != null) {
    html = months[newDate.getMonth()];
    html += ' ' + newDate.getDate();
    html += ' ' + newDate.getFullYear(); 
  }

  return new Handlebars.SafeString(html);
};
