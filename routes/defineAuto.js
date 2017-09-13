var express = require('express')
var router = express.Router()
var multer  = require('multer')
var upload = multer()

router.get('/', function(req, res, next) {
  res.render('defineAuto');
});

router.post('/file', upload.single('file'), function(req, res, next) {
  let text = req.body.text
  let output = text.replace(/&#[\d]+;/g,'')
  output = output.replace(/font-family:.*?(?=;|")/g,'')
  res.send({
    code:0,
    data: output
  })
});

module.exports = router;