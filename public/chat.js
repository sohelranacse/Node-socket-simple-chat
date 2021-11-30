// Make connection
var socket = io(); // io.connect('http://localhost:4000')

// Query Dom
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit events
// Chat

function submit_message() {
    submit_data();
}
$('#message').keypress(function(e) {
    socket.emit('typing', handle.value); // typing
    if(e.which == 13) {
        submit_data();
    }
});
$('#message').focusout(function() {
    socket.emit('typeout', handle.value); // typeout
});
function submit_data() {
    if(message.value !== "") {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
        message.value = "";
        $("#handle").prop('disabled', true);
    }
}

// Typing
/*message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
});*/

// listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML +='<p><strong>'+data.handle+': </strong>'+data.message+'</p>';
});
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>'+data+' is typing a message...</em></p>';
});
socket.on('typeout', function(data){
    feedback.innerHTML = '';
});