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
  res.redirect('https://www.ft.com/dashboards');
}

function republish_urls(req, res) {
  var urls = Object.assign({}, get_dashboard.urls);
  for (let name in urls) {
    urls[name] = urls[name].replace('/view/', '/republish/');
  }
  res.send(urls);
}

function read_urls(req, res) {
  res.send(get_dashboard.urls);
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
  router.get('/urls/republish', republish_urls);
  router.get('/urls/read', read_urls);
}

module.exports = init;
