const express = require('express');
const router = express.Router();

router.get('/ping', function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('pong!');
});

module.exports = router;
