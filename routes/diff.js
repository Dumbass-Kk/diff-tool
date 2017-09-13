var express = require('express')
var router = express.Router()
var multer  = require('multer')
var upload = multer()
var http = require('http');

router.get('/', function(req, res, next) {
  res.render('diff');
});

router.get('/ho', function(reqs, ress, nexts) {
  http.get('http://dc.simuwang.com/Fund/getNavList.html?id=HF00002DA5&muid=210628&page=2', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
    res.setEncoding('utf8');
    let rawData = '';
    ress.send(res);
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  })
})
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