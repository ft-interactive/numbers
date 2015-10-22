'use strict';

module.exports = function(url) {
  return 'https://h2.ft.com/image/v1/images/raw/' + encodeURIComponent(url) + '?width=308&source=ig_numbers&format=png';
};
