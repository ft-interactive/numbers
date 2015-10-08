'use strict';

const get_dashboard = require('../../models/economy/fetch');
/*

US

description=The FT’s one-stop overview of key US economic data and trends, including GDP, inflation, unemployment, consumer indicators, and the outlook for US interest rates
site name=US economy at a glance
og:title=21 charts that explain the US economy
og:description=The FT’s one-stop shop for key US economic data and trends, including GDP, inflation, unemployment, consumer indicators, and the outlook for US interest rates
og:image=http://im.ft-static.com/content/images/c46bbf42-5546-11e5-8642-453585f2cfcd.jpg


UK

title=The UK economy at a glance
description=The FT’s one-stop overview of key economic data, including GDP, inflation, unemployment, the major business surveys, the public finances and house prices
og:site_name=UK economy at a glance
og:title=44 charts that explain the UK economy
og:description=The FT’s one-stop shop for key economic data, including GDP, inflation, unemployment, the major business surveys, the public finances and house prices
og:image=http://im.ft-static.com/content/images/4b633cae-37a2-11e5-bdbb-35e55cbae175.png

*/

function dashboard(req, res) {
  res.render('economies/dashboard');
}

function card(req, res) {
  res.render('economies/card');
}

function find_economy(req, res, next, economy) {
  res.locals.meta = {og:{}};
  get_dashboard(economy).then(data => {
    res.locals.dashboard = data;
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
  router.param('economy', find_economy);
  router.get('/:economy', cache_control, dashboard);
  router.get('/:economy/cards', cache_control, card);
}

module.exports = init;
