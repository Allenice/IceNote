/*
* 资源管理
* @date 2015-04-27
* */

var path = require('path'),
    fs = require('fs'),
    mime = require('./mime');

module.exports = function (route) {

  route.addRoute('GET/*', function(req, res, match) {
    var pathname = req.url.split('?')[0],
      url = pathname === '/' ? '/index.html' : pathname,
      ext = url.substr(url.lastIndexOf('.') + 1, url.length),
      filePath = path.join(rootPath, './public/' + config.theme + url);

    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end('404! not found:' + url);
      }

      var mimeType = mime[ext] || 'text/html';
      res.writeHead(200, {
        'Content-Type': mimeType
      });
      res.end(data);
    });
  });

}