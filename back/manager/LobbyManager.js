function LobbyManager(io){
  var LbMg = this;
  LbMg.lobby = [];

  //Enter lobby
  LbMg.push = function(socket){
    if ( LbMg.lobby.length == 0 ){
      LbMg.lobby.push(socket);
    }
    for ( var i in LbMg.lobby ){
      if ( LbMg.lobby[i].name !== socket.name ){
        LbMg.lobby.push(socket);
      }
    }
  };

  //Leave lobby
  LbMg.kick = function(socket){
    var index = LbMg.lobby.indexOf(socket);
    if(index >= 0) LbMg.lobby.splice(index,1);
  };

  //Clean lobby -- delete null elements in lobby array
  LbMg.clean = function(){
    var sockets = LbMg.lobby;
    LbMg.lobby = sockets.filter(function(socket){
      return socket !== null;
    });
  };

  //Make rooms for users in lobby
  LbMg.calling = function(RmMg){
    while(LbMg.lobby.length > 1){
        var player0 = LbMg.lobby.splice(0,1);
        var player1 = LbMg.lobby.splice(0,1);
        RmMg.create(player0[0],player1[0]);
    }
  };
}
module.exports = LobbyManager;
