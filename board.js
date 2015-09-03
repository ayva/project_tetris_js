
var Game = Game || {};

Game.Board = (function(){

  //Field keeps track of occupied coordinates
  var field = [];
  var needNewBlock = false;

  var occupied = function(shiftx,shifty,dir) {
    var dir = Game.Model.currentBlock.dir+dir
    var type = Game.Model.currentBlock.type
    var x = Game.Model.currentBlock.position.x+shiftx
    var y = Game.Model.currentBlock.position.y+shifty
    var result = false;
    Game.Board.needNewBlock = false;

    Game.Renderer.eachblock(type, x, y, dir, function(x, y) {
      console.log(x, y)
      console.log(result)
      if ((x < 0) || (x >= 400)  || (y >= 700)){
        result = true;
      }

      if(y === 700){
        // Game.Model.blocks.push(Game.Model.currentBlock);
        // Game.Model.createBlock();
        Game.Board.needNewBlock = true;
      }
    });
    return result;

  };

  var unoccupied = function(shiftx,shifty,dir) {
    return !occupied(shiftx,shifty,dir);
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

  return {
    occupied: occupied,
    unoccupied: unoccupied,
    needNewBlock:needNewBlock
  }

})();