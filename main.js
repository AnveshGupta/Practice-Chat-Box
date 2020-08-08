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

io.on('connect',(socket) => {
    username = socket.handshake.query.user;
    m_r_user = {user:username,socket:socket.client.id};
    users.push(m_r_user);
    // console.log(Object.keys(io.engine.clients)); // used to print the socketid of connected users.
    // console.log(io.engine.clientsCount); 
    io.emit('users',users);
    socket.on('chat message', (data) => {

        var user_send;
        users.forEach(function(user){
            if(user.socket == data.from){
                user_from = user.user;
                data_send = {from:user_from,msg:data.message}
                io.to(data.to).emit('chat message', data_send);
                // io.sockets.in(data.touser).emit('chat message', data_send );
                return;
            }
        });

    });
});