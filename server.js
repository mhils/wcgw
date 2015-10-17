var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/play/:id', function(req, res) {
  res.sendFile(__dirname + '/public/play.html');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);
});