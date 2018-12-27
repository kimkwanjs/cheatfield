const express = require('express');
const port = process.env.PORT || 3000;
const http = require('http')
const path = require('path')
const app = express();
var favicon = require('serve-favicon')

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-history-api-fallback')());
app.use(favicon(path.join(__dirname, 'public/static/img', 'favicon.ico')))

app.get(/.*/, function (req, res, next) {
  res.sendFile(path.join(__dirname, '/public', 'index.html'))
});

const server = require('http').createServer(app);


const io = require('socket.io')(server);

var LobbyManager = new (require('./manager/LobbyManager.js'))(io);
var RoomManager = new (require('./manager/RoomManager.js'))(io);

io.on('connection', function(socket) {
  console.log(12312)
  //유저 게임서치 이벤트
  socket.on('gameSearch', (nick) => {
    socket.name = nick
    console.log(`socket.name 겜서치`)
    LobbyManager.push(socket);
    LobbyManager.calling(RoomManager);
  })
  // ---------- 게임 서칭 취소 ----------
  socket.on('gameSearchCancle', () => {
    LobbyManager.kick(socket);
    LobbyManager.clean();
  })

  //유저 카드선택 이벤트
  socket.on('cardSelect', (nick,data) => {
      console.log(nick +' - '+ data)
      var roomIndex = RoomManager.roomIndex[nick];
      socket.broadcast.to(roomIndex).emit('enemySelect', data);
  })

  //유저 끊김
  socket.on('disconnectUser', () => {
    LobbyManager.kick(socket);
    LobbyManager.clean();
    var roomIndex = RoomManager.roomIndex[socket.name];

    socket.broadcast.to(roomIndex).emit('gamePlayDestroy');
  });

  socket.on('disconnect', function(){
    LobbyManager.kick(socket);
    LobbyManager.clean();
    var roomIndex = RoomManager.roomIndex[socket.name];
    if(roomIndex) socket.broadcast.to(roomIndex).emit('gamePlayDestroy');

    console.log('user disconnected: ', socket.name);
  });
});


server.listen(port, function() {
  console.log('server start port : '+ port);
});
