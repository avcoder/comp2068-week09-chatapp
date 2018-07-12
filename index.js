const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

const server = app.listen(3000);

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  /* default username */
  socket.username = 'Anonymous';

  /* We also will listen to any call made in « change_username.
    If a message is sent to this event, the username will be changed. */
  socket.on('change_username', (data) => {
    socket.username = data.username;
  });

  /* listen on new message */
  socket.on('new_message', (data) => {
    /* broadcast the new message */
    io.sockets.emit('new_message', {
      message: data.message,
      username: socket.username,
    });
  });
});
