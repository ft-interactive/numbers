'use strict';

function home(req, res) {
  res.redirect('/sites/numbers/economies');
}

function init(router) {
  router.get('/', home);
}

module.exports = init;
