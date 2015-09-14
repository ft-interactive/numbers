'use strict';

function home(req, res) {
  res.redirect('/about');
}

function init(router) {
  router.get('/', home);
}

module.exports = init;
