//node server that will handle socket connection
const io = require('socket.io')(5000);

const users = {};

io.on('connection', socket =>
{
socket.on('new-user-joined', name =>{//event name and listener
users[socket.id] = name;
console.log("new user joind: ", name);
socket.broadcast.emit('user-joined', name);
});

socket.on('send', message=>{
    socket.broadcast.emit('receive', {msg:message, name: users[socket.id]})
});

socket.on('disconnect', message=>{
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];

});
})