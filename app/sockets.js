var users = require('./users');


module.exports = function(io){
    io.on('connection',function(socket){

        console.log('Nuevo Usuario Conectado');
        addUser(socket);
        disconnectUser(socket);
        newMessage(socket);
        newImage(socket);
        
    });
}
/*socket.on('chat:escribiendo',(data)=>{
    socket.broadcast.emit('chat:escribiendo',data);
})*/


function addUser(socket){
    socket.on('username',function(data){
        socket.username = data.username;
        users.push(data.username);
        updateUsers(socket);
    });
}

function updateUsers(socket){
    socket.emit('updateUsers',{users});
    socket.broadcast.emit('updateUsers',{users});
}

function disconnectUser(socket){
    socket.on('disconnect',function(){
        if(socket.username){
            users.splice(users.indexOf(socket.username),1);
        }
        updateUsers(socket);
    });
}
/*
function newImage(socket){
    socket.on('newImage',function(msg,base64image){

    })
}*/

function newMessage(socket){
    socket.on('newMessage',function(data){
        socket.emit('updateMessages',data);
        socket.broadcast.emit('updateMessages',data);
    //     scrollToBottom()
    });

}
function newImage(socket){
    socket.on('newImage',function(data,image){
        console.log(data,image);
        socket.emit('updateImage', data,image);
        socket.broadcast.emit('updateImage', data,image);  
    })

}
/*
function updateImage(socket){
    $('#imagefile').on('change',function(e){
        var file = e.originalEvent.target.file[0];
        var reader = new FileReader();
        reader.onload = function(evt){
            socket.emit('userimage',evt.target.result);
        };
        reader.readAsDataURL(file);
    })
}*/

/*function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}*/