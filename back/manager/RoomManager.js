function RoomManager(io){
  var RmMg = this;
  RmMg.rooms = {};
  RmMg.roomIndex = {};
  var roomId;
  RmMg.create = function(player0,player1){
      roomId = player0.name+player1.name;
     	var room = new Room(RmMg,roomId,player0,player1);
      player0.join(roomId);
      player1.join(roomId);

      RmMg.roomIndex[player0.name] = roomId;
      RmMg.roomIndex[player1.name] = roomId;

      RmMg.rooms[roomId] = room;
      io.to(player0.id).emit("ready_ok", player1.name );
      io.to(player1.id).emit("ready_ok", player0.name);
      console.log(player1.name + ' vs ' + player0.name);
      console.log(roomId);

  };
}

function Room(RmMg, id, player0, player1) {
  var room = this;
  room.id = id;
  room.RmMg = RmMg;
  room.players = [player0,player1];
}

module.exports = RoomManager;
