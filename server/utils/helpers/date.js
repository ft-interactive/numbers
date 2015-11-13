'use strict';

const Handlebars = require('handlebars');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = function (dateUpdated) {

  let newDate = new Date(dateUpdated);

  if (isNaN(+ newDate)) {
    newDate = null;
  };
    
  let html = '';
  
  if(newDate != null) {
    html = months[newDate.getMonth()];
    html += ' ' + newDate.getDate();
    html += ' ' + newDate.getFullYear(); 
  }

  return new Handlebars.SafeString(html);
};
