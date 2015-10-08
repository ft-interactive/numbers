const health = require('./health');

exports.middleware = (req, res) => {
  res.set('Cache-Control', 'no-cache');
  if (health.ok) {
    res.status(200).send('ok');
  } else {
    res.status(503).send('unavailable');
  }
};
