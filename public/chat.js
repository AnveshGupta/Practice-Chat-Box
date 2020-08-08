users_online = [];
this_user =  null;
this_socket = null;
setuser = null;
$(document).ready(function(){
    username = prompt("Nickname : ");
    if(!username){
        username = "anoynomous";
    }
    $("#currentusername").text("Welcome to chatbox : " + username);
});

$(function(){
    connectionprofile = "http://localhost:3000?user="+username;
    socket = io.connect(connectionprofile);
    socket.on('connect', function() {
        if(!this_socket){
            this_socket = socket.id;
        }
    });
    $('form').submit(function(e) {
        e.preventDefault(); // prevents page reloading
        console.log($('#m').val());
        socket.emit('chat message', {from: this_socket, to:setuser,message:$('#m').val()});
        $('#m').val('');
        return false;
    });
    socket.on("users",function(users){
        users.forEach(function(user){
            found = false;
            if(user.socket != this_socket){
                users_online.forEach(function(list_user){
                    if(list_user.socket == user.socket ){
                        found = true;
                    }
                });
                if(!found){
                    users_online.push(user);
                    var button = $("<button>");
                    button.text(user.user);
                    button.click(function () {
                        touser(user);
                    });
                    // button.on("click", function () {
                    //     touser(user);
                    // });
                    var li = $("<li>");
                    li.append(button);
                    $('#userlist').append(li);
                }
            }
        });

    });
    socket.on('chat message', function(data){
        $('#messages').append($('<li>').text(data.from + " : " +data.msg));
    });
});
function touser(user){
    setuser = user.socket;
    console.log(user.user);
}
