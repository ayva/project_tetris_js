
var Game = Game || {};

Game.Board = (function(){

  //Field keeps track of occupied coordinates
  var field = [];
  var needNewBlock = false;


  var hasBlock = function(x,y){
  
    for(var i=0; i < Game.Model.blocks.length; i++){
        console.log("Looking for" + x,y)
        console.log("Checked" + Game.Model.blocks[i].position.x,Game.Model.blocks[i].position.y)
      if(Game.Model.blocks[i].position.x === x && Game.Model.blocks[i].position.y === y) { 
      
            Game.Board.needNewBlock = true;
        return true 
      }
    }
    return false
    
  }

  var occupied = function(shiftx, shifty, dir) {
    var dir = Game.Model.currentBlock.dir+dir
    var type = Game.Model.currentBlock.type
    var x = Game.Model.currentBlock.position.x+shiftx
    var y = Game.Model.currentBlock.position.y+shifty
    var result = false;
    Game.Board.needNewBlock = false;

    Game.Renderer.eachblock(type, x, y, dir, function(x, y) {

      console.log(x, y, result)
      if ((x < 0) || (x >= 400)  || (y >= 700) || hasBlock(x,y)){
        result = true;
      }
      if(y >= 700){
        console.log("needNeBlock" + Game.Board.needNewBlock)
        Game.Board.needNewBlock = true;
      }
    });
    return result;

  };

  var unoccupied = function(shiftx,shifty,dir) {
    return !occupied(shiftx,shifty,dir);
  };



  return {
    occupied: occupied,
    unoccupied: unoccupied,
    needNewBlock:needNewBlock
  }

})();