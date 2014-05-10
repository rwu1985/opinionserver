var http = require('http');
var express = require('express');
var app = express();

app.set('view options', { layout: false });
app.use(express.static(__dirname + '/public'));

app.engine('html', require('ejs').renderFile);
// app.engine('.html', {
//   compile: function(str, options) {
//     return function(locals) {
//       return str;
//     };
//   }
// });

app.get('/test', function(req, res) {
  res.send('Hello, world');
});

app.get('/vote', function(req, res) {
  res.render('votingclient.html', { title: 'Voting Client'});
});

app.listen(8080);

// socket.io functions

var io = require('socket.io').listen(http.createServer(app));
var votes = new Array();

// on a 'connection' event
io.sockets.on('connection', function(socket) {
  console.log('Connection ' + socket.id + ' accepted.');

  socket.on('vote', function(vote) {
    console.log('Client ' + socket.id + ' voted ' + vote);
    votes[socket.id] = vote;
    print_votes();
  });

  // on a 'disconnect' event
  socket.on('disconnect', function(socket) {
    console.log('Connection ' + socket.id + ' terminated.');
  });

});

print_votes = function() {
  var total = 0;
  console.log("\nVotes:");
  for (var v in votes) {
    console.log("\tvotes[" + v + "] = " + votes[v]);
  }
  console.log("\n");
}