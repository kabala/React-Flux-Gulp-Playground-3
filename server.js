var express = require('express');

express()
  .set('view engine', 'jade')
  .use(express.static('./public'))
  .get('*', function (req, res) {
    res.render('index');
  })
  .listen(3000);
