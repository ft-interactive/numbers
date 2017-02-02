'use strict';

module.exports = function(url) {
  return 'https://www.ft.com/__origami/service/image/v2/images/raw/' + encodeURIComponent(url) + '?width=308&source=ig_numbers&format=png';
};
