'use strict';

const get_dashboard = require('../../models/economy/fetch');
const get_latest = require('../../models/datasets/latest/fetch.js');

function dashboard(req, res) {
  res.render('economies/dashboard');
}

function card(req, res) {
  res.render('economies/card');
}

function home(req, res) {
  res.render('economies/home');
}

function find_economy(req, res, next, economy) {
  Promise.all([
    get_dashboard(economy),
    get_latest()
  ]).then(data => {
    res.locals.dashboard = data[0];
    res.locals.latest = data[1];
    res.locals.meta = res.locals.dashboard.meta;
    next();
  }).catch(next);
}

function cache_control(req, res, next) {
  if (!res.headersSent) {
    // browser and CDN cache for 5 mins
    // allow proxys to keep while revalidating after 1 hours
    // serve stale on pages with 400-500 range for up to 3 days
    res.set('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600, stale-if-error=259200');
  }
  next();
}

function init(router) {
  router.get('/', home);
  router.param('economy', find_economy);
  router.get('/:economy', cache_control, dashboard);
  router.get('/:economy/cards', cache_control, card);
}

module.exports = init;
