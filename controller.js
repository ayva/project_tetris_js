// $(document).ready(function(){

 
// })

document.getElementById("start").onclick = function(){Game.Controller.startGame()}

var Game = Game || {};

Game.Controller = (function(){
  

  var score = 0;
  var needBlock = false;
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

  function startGame(){
      $('#gameover').text('')
      window.clearInterval(Game.Renderer.rendering);
      window.clearInterval(Game.Renderer.motion);
      
      //Reset data
      Game.Board.setField([]);
      Game.Model.blocks = [];
      Game.Model.currentBlock = {};
      Game.Controller.score = 0;


      //Draw Board and shapes
      Game.Renderer.init();
      //Start listener
      Game.Controller.init();

    
  }


  function rotatePiece(){
      Game.Model.currentBlock.nextdir();

      if (occupied(0, 0) ){
        Game.Model.currentBlock.prevdir();
      } 
  }

  function moveLeft(){
    if (unoccupied(-Game.Board.blockwidth, 0)){
     Game.Model.currentBlock.position.x -= Game.Board.blockwidth;
     } 
  }

  function moveRight(){
    if (unoccupied(Game.Board.blockwidth, 0)){
      Game.Model.currentBlock.position.x += Game.Board.blockwidth;
    }
  }


  function moveDown(){
    if (unoccupied(0, Game.Board.blockheight)){
      Game.Model.currentBlock.position.y += Game.Board.blockheight;
    }
    NeedNewBlock();
  }

  function NeedNewBlock(){
    if(Game.Board.needBlock){
      //Record blocks coord as taken
      Game.Board.addCoord(Game.Model.currentBlock);
      //Check if bottom is full
      while(Game.Board.checkBottom()){
        Game.Board.shiftBlocksDown();
      }
      //Create a new block and make it current
      Game.Model.createBlock();

      //Reset check value
      Game.Board.needBlock = false;

    }
  }

  var currentCoord = function(block){
    //Walks through each block in shape and records coords for occupied blocks
    var type = block.type
    var x = block.position.x
    var y = block.position.y
    var dir = block.dir
    Game.Renderer.eachblock(type, x, y, dir, function(x,y){
      console.log("Current coord "+ x,y)
    })

  }

  var gameOver = function(){
    if(occupied(0,0)){
      $('#gameover').text('Game is over')
      return true
    }
    return false
  }

  var occupied = function(shiftx, shifty) {
    var dir = Game.Model.currentBlock.dir
    var type = Game.Model.currentBlock.type
    var x = Game.Model.currentBlock.position.x + shiftx
    var y = Game.Model.currentBlock.position.y + shifty
    var result = false;
    Game.Board.needBlock = false;

    //Check if border or block met 
    Game.Renderer.eachblock(type, x, y, dir, function(x, y) {
      if ((x < 0) || (x >= Game.Renderer.canvas.width())  || (y >= Game.Renderer.canvas.height()) || Game.Board.takenCoord(x,y)){
        result = true;
      }
      if (y >= 700 || Game.Board.takenCoord(x,y)) {
        Game.Board.needBlock = true;
      }
    });
    return result;

  };


  var unoccupied = function(shiftx,shifty) {
    return !occupied(shiftx,shifty);
  };

  return{
    init: init,
    score: score,
    moveDown: moveDown,
    gameOver: gameOver,
    startGame:startGame,
    occupied:occupied
  
  };  

  
})();