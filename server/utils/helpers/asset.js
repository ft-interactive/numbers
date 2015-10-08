'use strict';

const prod = process.env.NODE_ENV === 'production';
const debug = require('debug')('assets');

var static_base = process.env.STATIC_BASE || '';

if (static_base.charAt(static_base.length -1) !== '/') {
  static_base += '/';
}

var static_base_valid = static_base.charAt(0) === '/' || /^https?:\/\//.test(static_base)

if (!static_base_valid) {
  throw new Error('Invalid static base url: ' + static_base);
}

var getAsset = function(name) {
  return static_base + name;
};

try {
  if (prod) {
    let assets = require('../../../public/rev-manifest.json');
    for (let name in assets) {
      assets[name] = static_base + assets[name];
    }
    debug('Using rev\'d assets %j', assets);
    getAsset = function(name, b, c) {
      return assets[name] || '';
    };
  }
} catch (e) {
  console.error('Error loading asset manifest');
}

module.exports = getAsset;
