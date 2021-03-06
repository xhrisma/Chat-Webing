
let msgArea = document.querySelector('#messages')


$(document).ready(function(){
    var socket = io();
    username(socket);
    updateUsers(socket);
    newMessage(socket);
    updateMessages(socket);
    newImage(socket);
    updateImage(socket);
   
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
            html += '<i class="fa fa-circle  online-icon"></i>';
            html += data.users[i];
            html += '</div';
            $('#users').append(html);
        }
    });

}


function newMessage(socket){
    $('#message').keydown(function(ev){
        if(ev.keyCode ==13){
            ev.preventDefault();
            if($('#message').val()){
            $('#send-msg-form').submit();
            }
        }
    });
    $('#send-msg-form').submit(function(ev){
        ev.preventDefault();
        if($('#message').val()){
        socket.emit('newMessage',{
            username: localStorage.username,
            message: $('#message').val()
        });
        }
        document.querySelector('#send-msg-form').reset();
        
    });

   
    
}

function updateMessages(socket){
    socket.on('updateMessages',function(data){
        let html = '';
       
        if(data.username == localStorage.username){
           
            html += '<div class="my-msg full-width flex " >';
            html += '<div class="message"><h4> Tú </h4>';
            html += '<p class="online "> <i class="fa fa-user-circle"></i>' + data.message + '</p>';
            html += '</div>';
            html +=  '</div>';
     
        }else{
            html += '<div class="full-width flex" >';
            html += '<div class="messagerpta"><h4>'+ data.username + '</h4>';
            html += '<p class="onlinerpta "> <i class="fa fa-user-circle"></i>' + data.message + '</p>';
            html += '</div>';
            html +=  '</div>';
        }
        $('#msg-list').append(html);

    scrollToBottom();
    });

}
function newImage(socket){
    $('#imagefile').on('change',function(e){
        var file = e.originalEvent.target.files[0];
        var reader = new FileReader();
        reader.onload = function(evt){
            socket.emit('newImage',evt.target.result,{
                username: localStorage.username,
              imagefile: $('#imagefile').val()
            });
        };
        reader.readAsDataURL(file);
        document.querySelector('#imagefile').reset();
    })
}
function updateImage(socket){
            socket.on('updateImage',function(base64image,data){
                let html = '';
                if(data.username == localStorage.username){
           
                    html += '<div class="my-msg full-width flex " >';
                    html += '<div class="message"><h4> Tú </h4>';
                    html += '<p class="online imgcomp "><i class="fa fa-user-circle"></i><img src="' + base64image + '"/> </p> ';
                    html += '</div>';
                    html +=  '</div>';

                }else{
                    html += '<div class="full-width flex " >';
                    html += '<div class="messagerpta"><h4>'+ data.username + '</h4>';
                    html += '<p class="onlinerpta imgcomp "><i class="fa fa-user-circle"></i><img src="' + base64image + '"/> </p> ';
                    html += '</div>';
                    html +=  '</div>';

                }   
               
            $('#msg-list').append(html);
            scrollToBottom();
        });
}
function scrollToBottom(){
    msgArea.scrollTop=msgArea.scrollHeight
}