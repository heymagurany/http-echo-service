var http = require('http');
var zlib = require('zlib');
var port = parseInt(process.argv[2]);
var statusCode = process.argv[3] ? parseInt(process.argv[3]) : 200;
var server = http.createServer((request, response) => {
  process.stdout.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\n`)
  for (var headerName in request.headers) {
    process.stdout.write(`${headerName}: ${request.headers[headerName]}\n`);
  }
  process.stdout.write('\n');

  var inflated;
  if (request.headers['content-encoding'] === 'gzip') {
    var gzip = zlib.createGunzip();
    inflated = request.pipe(gzip);
  }
  else {
    inflated = request;
  }
  inflated.pipe(process.stdout);

  request.on('end', () => {
    response.writeHead(statusCode);
    response.end();
    process.stdout.write('\n');
  });
});

server.listen(port);
