window.onload = function(){
    document.querySelector('#send-form')
            .addEventListener('click',function(ev){
                localStorage.username = document.querySelector('#username').value;
            });
}