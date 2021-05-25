
let msgArea = document.querySelector('#messages')

$(document).ready(function(){
    var socket = io();
    username(socket);
    updateUsers(socket);
    newMessage(socket);
    updateMessages(socket);
});

function username(socket){
    socket.emit('username',{
        username: localStorage.username
    })

}

function updateUsers(socket){
    socket.on('updateUsers',function(data){
        $('#users').html('');
        for(var i = 0; i < data.users.length; i++){
            html = '';
            html += '<div class="user">';
            html += '<i class="fa fa-circle online-icon"></i>';
            html += data.users[i];
            html += '</div';
            $('#users').append(html);
        }
    });

}


function newMessage(socket){
    const message=$('#message').val();
    if(message){

    $('#message').keydown(function(ev){
        if(ev.keyCode ==13){
            ev.preventDefault();
            $('#send-msg-form').submit();
        }
    });
    $('#send-msg-form').submit(function(ev){
        ev.preventDefault();
        socket.emit('newMessage',{
            username: localStorage.username,
          //  genero: localStorage.genero,
            message: $('#message').val()
        });
        
        document.querySelector('#send-msg-form').reset();
        
    });
}
   
    
}

function updateMessages(socket){
    socket.on('updateMessages',function(data){
        let html = '';
        if(data.username == localStorage.username){
            html += '<div class="my-msg full-width flex">';
            html += '<div class="my-style-m message"><h4> Tú </h4>';
            html += '<p class="lighter">' + data.message + '</p>';
            html += '</div></div>';
        }else{
            html += '<div class="full-width flex">';
            html += '<div class="blue message"><h4>' + data.username + '</h4>';
            html += '<p class="lighter">' + data.message + '</p>';
            html += '</div></div>';
        }
        $('#msg-list').append(html);
        scrollToBottom();
    });
    
}
function scrollToBottom(){
    msgArea.scrollTop=msgArea.scrollHeight
}