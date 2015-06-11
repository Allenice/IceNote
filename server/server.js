/*
* 简单的 http 服务器
* @date 2015-04-27
* */

var http = require('http'),
    url = require('url'),
    qs = require('querystring'),
    router = require('routes')(),
    asset = require('./modules/asset'),
    api = require('./modules/api'),
    db = require('./modules/db');

// 初始化数据库
db.init().then(function() {

  // 数据接口路由
  api(router);

  // 添加资源路由
  asset(router);

}, function() {
  console.log('数据库初始化失败');
});

// 创建服务器
var server = http.createServer(function (req, res) {
  var match = router.match(req.method + url.parse(req.url).pathname);

  if(match) {
    if (req.method === 'GET') {
      match.query = url.parse(req.url, true).query || {};
      match.fn(req, res, match);
    } else {
      var body = '';

      req.on('data', function (data) {
        body += data;
      });

      req.on('end', function () {
        match.query = qs.parse(body);
        match.fn(req, res, match);
      });
    }
  } else {
    res.writeHead(404);
    res.end('404 not found');
  }
});

server.listen(config.port);
console.log('serve start at port:' + config.port);

