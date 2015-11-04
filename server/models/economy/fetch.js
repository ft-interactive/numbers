'use strict';

const Poller = require('../../utils/poller');
const errors = require('../../utils/errors');
const spreadsheet = require('./spreadsheet');

const urls = {};

urls.us = spreadsheet.dashboard_data_url('10WUqpLJvOi1XBTphamV0pusNvwCji3mYYilwPTDu85M');
urls.uk = spreadsheet.dashboard_data_url('1zxgqC77xTm9Wp9mFe2BRXxJ4o_dNNedxUpx5PNVXBiY');

if (process.env.NODE_ENV !== 'production') {
  // test use cases and new spreadsheet structure
  urls.test = spreadsheet.dashboard_data_url('1I2gBcr29kDHXYhBbSTHfO0VVFFwYzvGICl_XaktN21w');

  // dashboards in development. dont allow them in prod yet
  urls.china = spreadsheet.dashboard_data_url('1j6V0OpSP4KJRaWirUGoPRU1rA5ACL7Y_x32ZFg1-GnE');
  urls.japan = spreadsheet.dashboard_data_url('1jN8KsOWEFCFsUDU_1h_QZ_HnGKL29TkpMSjRWxdBr-w');
}

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
