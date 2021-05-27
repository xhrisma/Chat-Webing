window.onload = function(){
    document.querySelector('#send-form')
            .addEventListener('click',function(ev){
                localStorage.username = document.querySelector('#username').value;
                localStorage.avatar = document.querySelector('input[name=avatar]:checked').value;
            });
}