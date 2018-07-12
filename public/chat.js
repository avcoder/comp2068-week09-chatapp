const socket = io.connect('http://localhost:3000');

/* buttons and inputs */
const chatroom = document.getElementById('chatroom');
const message = document.getElementById('message');
const sendMessage = document.getElementById('send_message');
const username = document.getElementById('username');
const sendUsername = document.getElementById('send_username');

/* listen on new_message */
socket.on('new_message', (data) => {
  console.log(data);
  chatroom.insertAdjacentHTML(
    'beforeend',
    `<p>${data.username}: ${data.message}</p>`,
  );

  // keep focus scrolled to bottom for new chats
  chatroom.scrollTop = chatroom.scrollHeight;
});

/* Emit message */
sendMessage.addEventListener('click', (event) => {
  event.preventDefault();
  socket.emit('new_message', { message: message.value });
  message.value = '';
});

/* Emit a username */
sendUsername.addEventListener('click', () => {
  console.log(username.textContent);
  socket.emit('change_username', { username: username.value });
});
