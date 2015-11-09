'use strict';

function home(req, res) {
  res.redirect('/economies/');
}

function init(router) {
  router.get('/', home);
}

module.exports = init;
