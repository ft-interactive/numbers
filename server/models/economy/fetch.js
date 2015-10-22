'use strict';

const Poller = require('../../utils/poller');
const errors = require('../../utils/errors');
const spreadsheet = require('./spreadsheet');

const urls = {
  us: spreadsheet.dashboard_data_url('10WUqpLJvOi1XBTphamV0pusNvwCji3mYYilwPTDu85M'),
  uk: spreadsheet.dashboard_data_url('1zxgqC77xTm9Wp9mFe2BRXxJ4o_dNNedxUpx5PNVXBiY')
};

const dashboards = {};

const pollers = {};

module.exports = function(name) {

  const dashboard = dashboards[name];

  if (dashboard) {
    return dashboard;
  }

  const url = urls[name];
  
  if (!url) {
    return Promise.reject(new errors.NotFoundError('Economy'));
  }

  return create_poller(name, url).start();

};

function create_poller(name, url) {

  if (pollers[name]) {
    return pollers[name];
  }

  const poller = new Poller(url);
  pollers[name] = poller;

  poller.each = data => {
    const dashboard = spreadsheet.create_dashboard(data);
    dashboards[name] = Promise.resolve(dashboard);
    return dashboard;
  };

  console.log('create poller for %s on %s', name, url);

  return poller;
}

module.exports.pollers = pollers;
