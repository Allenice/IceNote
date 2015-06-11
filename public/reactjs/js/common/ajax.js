/*
* ajax 封装
* */


function param(obj) {
  var p = '';

  for(var key in obj) {
    p += (key + '=' + obj[key] + '&');
  }

  return p.substr(0, p.length - 1);
}

var emptyFunc = function() {};

function ajax(options) {
  var xhr = new XMLHttpRequest();
  var method = options.method || 'GET',
      data = options.data || {},
      url = options.url || '',
      type = options.dataType || 'json',
      success = options.success || emptyFunc,
      error = options.error || emptyFunc;

  method = method.toUpperCase();
  data = param(data);

  if(!url) return;

  xhr.addEventListener('readystatechange', function(e) {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      var response = type === 'json' ? xhr.response : xhr.responseText;
      if(xhr.status === 200) {
        success(response, xhr, e);
      } else {
        error(response, xhr, e);
      }
    }
  }, false);

  xhr.addEventListener('error', function(e) {
    var response = type === 'json' ? xhr.response : xhr.responseText;
    error(response, xhr, e);
  }, false);

  xhr.addEventListener('abort', function(e) {
    if(typeof options.abort === 'function') options.abort(xhr, e);
  }, false);


  xhr.responseType = options.dataType || 'json';

  if(method !== 'GET') {
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  } else {
    url += '?' + data;
    xhr.open(method, url);
    xhr.send();
  }

  return xhr;
}

module.exports = ajax;