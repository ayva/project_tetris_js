
var Game = Game || {};

Game.BoardModule = (function(){


  var occupied = function(type, x, y, dir) {
    var result = false;
    this.eachblock(type, x, y, dir, function(x, y) {
      if ((x < 0) || (x >= 400) || (y < 0) || (y >= 700) || getBlock(x,y))
        result = true;
    });
    return result;

  };

  var unoccupied = function(type, x, y, dir) {
    return !occupied(type, x, y, dir);
  };

  //returns true if space is occupied by another blokc
  // var getBlock = function(x, y){
    
  //   for(var i = 0; i < model.blocks.length; i++){
  //     if(model.blocks[i].position.x === x || model.blocks[i].position.y === y){
  //       return true;
  //     }
  //     else{
  //       return false;
  //     }
  //   }
  // };
  var getBlock = function(x, y){

    return (blocks && blocks[x] ? blocks[x][y] : null);
  };

})();