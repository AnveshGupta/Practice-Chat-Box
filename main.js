var express = require("express");
K = 1;
app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
users = [];
app.get('/', (req,res) => {
    res.render('../chatbox.ejs');
});
port = process.env.PORT || 3000;
server =  app.listen(port,() => {
    console.log("Server connected on port "+port);
});
var io = require('socket.io')(server);

io.on('connection',(socket) => {
    console.log("connection established"); 
    user = socket.handshake.query.user;
    console.log(user);
    console.log(socket.id);
    users.push({user: username , socket: socket.id});
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    });
});