var express = require('express');
var router = express.Router();

var map = new Map();

/* Add to key-value store. */
router.post('/:TTL?', function(req, res, next) {
  if (req.body.key !== undefined) {
    var TTL = req.query.TTL;
    if (TTL !== undefined && parseInt(TTL) != TTL)
      res.json({success: false, message: 'invalid TTL parameter'});
    map.set(req.body.key, {
      value: req.body.value,
      expireAt: TTL === undefined ? -1 : Date.now() + parseInt(TTL) * 1000
    });
    res.json({success: true, message: 'successfully added to key-value store'});
  } else {
    res.json({success: false, message: 'key not specified'});
  }
});

/* Get from key-value store. */
router.get('/', function(req, res, next) {
  let data = map.get(req.body.key);
  if (data === undefined || (data.expireAt !== -1 && data.expireAt < Date.now())) {
    res.json({success: true, value: ''});
  } else {
    res.json({success: true, value: data.value});
  }
});

/* Delete from key-value store. */
router.delete('/', function(req, res, next) {
  if (req.body.key) {
    map.delete(req.body.key);
    res.json({success: true, message: 'successfully deleted from key-value store'});
  } else {
    res.json({success: false, message: 'key not specified'});
  }
});

module.exports = router;
