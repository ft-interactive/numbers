'use strict';

const Poller = require('../../../utils/poller');
const url = process.env.LASTEST_DATA_URL ||  'http://interactive.ftdata.co.uk/data/bloomberg-economics/latest.json';

var last;

function each(data) {
  const map = data.reduce((o, e) => {
    if (e.ftname) {
      e.date = new Date(e.date);
      o[e.ftname] = e;
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
