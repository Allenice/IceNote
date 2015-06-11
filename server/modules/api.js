/*
* 数据接口
* */

var db = require('./db');

module.exports = function(router) {

  // api 的一些工具方法
  var api = {
    "get": function (path, handler) {
      router.addRoute("GET" + path, handler);
    },

    "post": function (path, handler) {
      router.addRoute("POST" + path, handler);
    },

    "delete": function (path, handler) {
      router.addRoute("DELETE" + path, handler);
    },

    "put": function (path, handler) {
      router.addRoute("PUT" + path, handler);
    },

    "patch": function (path, handler) {
      router.addRoute("PATCH" + path, handler);
    },

    sendJson: function(res, data) {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Methods': 'POST, GET, DELETE, PUT, PATCH'
      });
      res.end(JSON.stringify(data));
    },
    sendError: function(res, message) {
      res.writeHead(500, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Methods': 'POST, GET, DELETE, PUT, PATCH'
      });
      res.end(JSON.stringify(message));
    }

  };

  // 添加一个用户
  api.post('/api/user/', function(req, res, match) {
    db.UserModel.create(match.query).then(function(user) {
      api.sendJson(res, user);
    }, function(e) {
      api.sendError(res, {
        message: '新增用户出错'
      });
    });
  });

  // 添加一篇笔记
  api.post('/api/note/', function(req, res, match) {
    db.NoteModel.create(match.query).then(function(note) {
      api.sendJson(res, note);
    }, function(e) {
      console.log(e);
      api.sendError(res, {
        message: '新增笔记出错'
      });
    });
  });

  // 获取笔记列表
  api.get('/api/note/', function(req, res, match) {
    var uid = match.query.uid;
    db.NoteModel.findAll({
      where: {
        uid: uid
      },
      order: [
        ['updatedAt', 'DESC']
      ]
    }).then(function(result) {
      api.sendJson(res, result);
    }, function(e) {
      console.log(e);
      api.sendError(res, {
        message: "获取列表失败！"
      });
    });
  });

  // 获取一篇笔记
  api.get('/api/note/:id', function(req, res, match) {
    var id = match.params.id;
    db.NoteModel.findOne({
      where: {
        id: id
      }
    }).then(function(result) {
      api.sendJson(res, result);
    }, function(e) {
      console.log(e);
      api.sendError(res, {
        message: "获取笔记失败！"
      });
    });
  });

  // 更新一篇笔记
  api.put('/api/note/:id', function(req, res, match) {
    var id = match.params.id;
    db.NoteModel.update(match.query, {
      where: {
        id: id
      }
    }).then(function(note) {
      api.sendJson(res, note);
    }, function(e) {
      console.log(e);
      api.sendError(res, {
        message: "更新失败"
      })
    });
  });

  // 删除一篇笔记
  api.delete('/api/note/:id', function(req, res, match) {
    var id = match.params.id;
    db.NoteModel.destroy({
      where: {
        id: id
      }
    }).then(function(note) {
      api.sendJson(res, note);
    }, function(e) {
      console.log(e);
      api.sendError(res, {
        message: "删除失败"
      })
    });
  });

  api.get('/api/test/', function(req, res, match) {
    console.log(match.query);
    api.sendJson(res, {
      p: match.params,
      q: match.query
    });
  });

  api.post('/api/test/', function(req, res, match) {
    console.log(match.query);
    api.sendJson(res, {
      p: match.params,
      q: match.query
    });
  });

}
