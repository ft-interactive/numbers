'use strict';

exports.ok = false;

const economies = require('./models/economy/fetch');

exports.middleware = (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.send({
    dashboards: {
      economies: {
        us: economies.pollers.us,
        uk: economies.pollers.uk
      }
    }
  });
};
