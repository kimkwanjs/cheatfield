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

server.listen(port, function() {
  console.log('server start port : '+ port);
});

const io = require('socket.io')(server);

var LobbyManager = new (require('./manager/LobbyManager.js'))(io);
var RoomManager = new (require('./manager/RoomManager.js'))(io);

io.on('connection', function(socket) {
  //유저 게임서치 이벤트
  socket.on('gamerSearch', function(nick){
    socket.name = nick
    console.log(socket.name + '겜서치')
    LobbyManager.push(socket);
    LobbyManager.calling(RoomManager);
  })
  // ---------- 게임 서칭 취소 ----------
  socket.on('game_search_cancle', function(){
    LobbyManager.kick(socket);
    LobbyManager.clean();
  })

  //유저 카드선택 이벤트
  socket.on('card_select', function(nick,data){
      console.log(nick +' - '+ data)
      var roomIndex = RoomManager.roomIndex[nick];
      socket.broadcast.to(roomIndex).emit('enemy_select', data);
  })

  //유저 끊김
  socket.on('disconnect_user', function(){
    LobbyManager.kick(socket);
    LobbyManager.clean();
    var roomIndex = RoomManager.roomIndex[socket.name];

    socket.broadcast.to(roomIndex).emit('game_play_destroy');
  });

  socket.on('disconnect', function(){
    LobbyManager.kick(socket);
    LobbyManager.clean();
    var roomIndex = RoomManager.roomIndex[socket.name];
    if(roomIndex) socket.broadcast.to(roomIndex).emit('game_play_destroy');

    console.log('user disconnected: ', socket.name);
  });
});
