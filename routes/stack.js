var express = require('express');
var router = express.Router();

var stack = [];
/* Add to stack. */
router.post('/', function(req, res, next) {
  if (req.body.key !== undefined) {
    stack.push(req.body.key);
    res.json({success: true, message: 'successfully added to stack'});
  }
  else {
    res.json({success: false, message: 'store value not specified'});
  }
});

/* Get from stack. */
router.get('/', function(req, res, next) {
  if (stack.length > 0) {
    res.json({success: true, key: stack.pop()});
  } else {
    res.json({success: false, message: 'stack empty'});
  }
});

module.exports = router;
