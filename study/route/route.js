var http = require('http');
var url = require('url');
var querystring = require('querystring');

function onRequest(request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log('request for' + pathname);

  console.log(querystring.parse(url.parse(request.url).query));
  var body = 'hello world';
  response.writeHead(
      200, {'Content-Length' : body.length, 'Content-Type' : 'text/plain'});
  response.write(body);
  response.end();

  var data = '';
  request.on('data', function(chunk) { data += chunk; });
  request.on('end', function() { console.log('post data :' + data); });
}

http.createServer(onRequest).listen(8000);
console.log('server start');
