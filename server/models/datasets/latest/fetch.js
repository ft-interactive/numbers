'use strict';

const Poller = require('../../../utils/poller');
const url = process.env.LASTEST_DATA_URL ||  'https://ig.ft.com/autograph/data/latest.json';

var last;

function each(data) {
  const map = data.reduce((o, e) => {
    if (e.id) {
      e.date = new Date(e.date);
      o[e.id] = e;
    }
    return o;
  }, {});
  last = Promise.resolve(map);
  return map;
};


module.exports = () => {
  if (last) {
    return last;
  }

  const poller = new Poller(url);
  poller.each = each;

  return last = poller.start();
};
