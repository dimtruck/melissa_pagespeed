var express = require('express');
var router = express.Router();
var psi = require('psi');

/* GET home page. */
router.get('/', function(req, res, next) {
  // get the PageSpeed Insights report
//  psi('html5rocks.com', function (err, data) {
  //  console.log(data.score);
   // console.log(data.pageStats);
    res.render('index', { title: 'Express' });
  //});
});

router.post('/', function(req, res, next) {
  console.log('posting');
  var urls = req.body;
  console.log('urls',urls);
  var total = 0;
  var results = []
  for(var key in urls) {
    console.log('key',key);
    if(urls.hasOwnProperty(key)){
      total ++;
      
      var url = urls[key];
      console.log('url',url);
      (function(url){
      psi(url, function(err, data){
        total--;
        results.push({url: url, score: data.score, stats: data.pageStats})
        if(total == 0){
          console.log('render results');
          res.json({'results': { title: 'Results', results: results }});
        }
      });
      }(url));
    }
  }
});

module.exports = router;
