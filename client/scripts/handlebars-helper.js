var Handlebars = require('hbsfy/runtime');

Handlebars.registerHelper('arrows', function (text) {

  var html = '';

  if (!text) {
    return '';
  }

  if (text === 'up' || text ==='down') {

    console.log(text);
    html = '<img src="//ig.ft.com/static/sites/2014/economic-indicators/arrow.svg" alt="">';
  } else {
    html = 'no change'
    console.log(text);
  }

  return new Handlebars.SafeString(html);
});


Handlebars.registerHelper('date', function (dateUpdated) {

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
});
