
var Game = Game || {};

Game.Controller = (function(){
  

  function moveLeft(){

    if (Game.Board.unoccupied(-Game.Renderer.canvas.width()*0.4/4, 0,0)){
     Game.Model.currentBlock.position.x -= (Game.Renderer.canvas.width()*0.4)/4;
     } 
  }

  function rotatePiece(){
    var initialDir = Game.Model.currentBlock.dir;
      Game.Model.currentBlock.dir += 1;
      if (Game.Model.currentBlock.dir>3) {
        Game.Model.currentBlock.dir=0;
      }
      if (Game.Board.occupied(0, 0, 0) ){
        Game.Model.currentBlock.dir = initialDir;
      }
    
  }

  function moveRight(){
    
    if (Game.Board.unoccupied(Game.Renderer.canvas.width()*0.4/4, 0,0)){
      Game.Model.currentBlock.position.x += (Game.Renderer.canvas.width()*0.4)/4;
    }
  }

  function moveDown(){

    if (Game.Board.unoccupied(0, Game.Renderer.canvas.height()*0.2/4, 0)){
      Game.Model.currentBlock.position.y += (Game.Renderer.canvas.height()*0.2)/4;
    }
    NeedNewBlock();
  }

  function NeedNewBlock(){
    if(Game.Board.needNewBlock){
      Game.Model.createBlock();
      Game.Board.needNewBlock = false;
    }
  }
  

  var score = 0;
  var keys = {  
                37: moveLeft,
                38: rotatePiece,
                39: moveRight,
                40: moveDown
              };

  function init(){
    $(document).keydown(function(e){
      if (keys[e.keyCode]){
        keys[e.keyCode]();
      }

    });


  }

  return{
    init: init
  }

  
})();