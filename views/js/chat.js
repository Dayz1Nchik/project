const socket = io('ws://localhost:3000')

console.log(socket.id)

let send = document.querySelector('.send')
let chat = document.querySelector('.chat .center')
let writer = document.querySelector('.writer')


send.addEventListener('click', () => {
    let message = writer.value;
    socket.emit('message', message)
});

socket.on("connect", () => {
    console.log(socket.id)
    socket.emit("id", socket.id)
    socket.on('answer', (msg) => {
        let {user, message} = msg;
        console.log(msg);
        sendMessage(user.permissions, message)
    })
});
// ${person == 'teacher' ? 'right' : 'left'}
function sendMessage(person, message){
    
    
    chat.innerHTML += `
        <div class="content right">
            <div class="avatar">
                <div class="${person}-image"></div>
            </div>
            <div class="wrapper">
                <div class="message">
                    <p class="message-text">${message}</p>
                    <time class="message-time">${new Date().getHours()}: ${new Date().getMinutes()}</time>
                </div>
            </div>
        </div>
    `
    window.scrollTo(0, document.body.scrollHeight)
    writer.value = ''
}
