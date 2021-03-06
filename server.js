var express = require('express');

// App setup
var app = express()
var server = require('http').Server(app)
var socket = require('socket.io')


// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('Made socket connection', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
    socket.on('typeout', function(data){
        socket.broadcast.emit('typeout', data);
    });
})
server.listen(process.env.PORT||4000)