var express = require('express');
var router = express.Router();
var path = require("path");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve("public", "index.html"));
});

router.get('/content', function(req, res, next){
  res.send(content)
});

router.get('/brands', function(req, res, next){
  res.send(brands)
});

module.exports = router;
