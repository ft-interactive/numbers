'use strict';

const fetch = require('isomorphic-fetch');
const backoff = require('backoff');
const CircuitBreaker = require('circuit-breaker-js');
const debug = require('debug')('poller');
const errors = require('./errors');

const global_poll_interval = process.env.POLL_INTERVAL ? parseInt(process.env.POLL_INTERVAL) : 10000;

module.exports = Poller;

function Poller(url, options) {
  var options = options || {};
  this.url = url;
  this.status = {on: false, since: new Date()};
  this.interval = options.interval || global_poll_interval;
  this.last = {};
  this.is_stopped = true;

  var timer;
  var backoff_options = {
    initialDelay: this.interval * 2,
    maxDelay: this.interval * 50,
    randomisationFactor: 0.2
  };

  // TODO: calculate what these should be bsased on poll interval be so that we actually 
  //        break the circuit when appropriate
  var breaker = new CircuitBreaker({
    windowDuration: 10000,
    numBuckets: 10,
    timeoutDuration: 3000,
    volumeThreshold: 1,
    errorThreshold: 50
  });

  var backoff_strategy;

  breaker.onCircuitOpen = metrics => {
    console.error('Breaker on', metrics);
    this.stop();
    backoff_strategy = new backoff.FibonacciStrategy(backoff_options);

    // we dont want the first result from the fibonacci sequence
    // as it's repeated twice so just call next() to
    // remove the first number from the sequence
    backoff_strategy.next();

    check_later();
  };

  breaker.onCircuitClose = metrics => {
    debug('Breaker closed %j', metrics);
  };

  let check_later = () => {
    timer = setTimeout(() => {
      debug('Check %s',  this.url);
      request().then(() => {
          debug('Up %s', this.url);
          this.start();
      }).catch(() => {
          debug('Down %s', this.url);
          check_later();
      })
    }, backoff_strategy.next());
  }

  let repeat = data => {
    if (!this.status.on) {
      return;
    }

    timer = setTimeout(() => {
      breaker.run(request);
    }, this.interval);
  };

  let noop = () => {};

  let request = (success, fail) => {
    debug('Request %s', this.url);

    success = success || noop;
    fail = fail || noop;

    // TODO: allow for requests that need authentication
    // TODO: allow caching including sending if-none-match or if-modified-since

    return fetch(this.url, {timeout: options.timeout || 10000}).then((response) => {

      if (!response.ok) {
        throw new errors.BadServerResponseError('Error fetching from remote service. Url: ' + this.url);
      }

      debug('Response s% status=%n', this.url, response.status);

      var headers = response.headers;

      return response.json().then((data) => {
        let model = this.each(data, headers);

        // TODO: save last modified time and etag
        this.last = {time: new Date()};
        success();
        repeat();
        return model;
      });

    }).catch((e) => {
      debug('Error %s', e.message);
      fail();
      repeat();
      throw e;
    });
  }

  this.each = () => {};

  this.stop = () => {
    debug('Stop %s', this.url);
    this.status = {on: false, since: new Date()};
    if (timer) {
      clearTimeout(timer);
    }
  };

  this.start = () => {
    debug('Start %s', this.url);
    this.status = {on: true, since: new Date()};
    return request();
  };

  this.reload = () => request();

  return this;
}

