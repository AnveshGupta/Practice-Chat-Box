username =  null;
$(document).ready(function(){
    username = prompt("Nickname : ");
    if(!username){
        username = "anoynomous";
    }
});

$(function(){
    connectionprofile = "http://localhost:3000?user="+username;
    console.log(connectionprofile);
    socket = io.connect(connectionprofile);
    $('form').submit(function(e) {
        e.preventDefault(); // prevents page reloading
        console.log($('#m').val());
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
});
