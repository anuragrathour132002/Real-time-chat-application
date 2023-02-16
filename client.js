var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};
const socket = io('http://localhost:5000', connectionOptions);

const form = document.getElementById('send');
const messageInput = document.getElementById('message');
const messageContainer = document.getElementById('containerId');
const name = prompt("enter your name to Join");

const append =(message, position)=>
{
    const messageElement = document.createElement('div');
   messageElement.innerText = message;
   if(position=='left' || position=='right')
             messageElement.classList.add('message');
    messageElement.classList.add(position);
   // messageContainer.appendChild(messageElement);
    messageContainer.append(messageElement)
      
}

form.addEventListener('submit', (e)=>
{
    e.preventDefault();//page won't be reloading;
    const message = messageInput.value;
    if(message!='')
    {
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
    }
})
socket.emit('new-user-joined', name);
socket.on('user-joined', name=>
{
    append(`${name} Joined the chat`, 'middle')
})

socket.on('receive', data=>
{
    append(`${data.name}: ${data.msg}`, 'left')
})

socket.on('left', name=>
{
    append(`${name} left the chat`, 'middle')
})