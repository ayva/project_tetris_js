
var Game = Game || {};

Game.Renderer = (function(){
 
  var canvas = $("#canvas");

  function init(){
    //canvas = $("#canvas");

    Game.Model.createBlock();
    setInterval(function(){

      drawBg();
      // Game.Controller.NeedNewBlock();
      for(var i = 0; i < Game.Model.blocks.length; i++){
        drawPiece(Game.Model.blocks[i].type, Game.Model.blocks[i].position.x, Game.Model.blocks[i].position.y, Game.Model.blocks[i].dir, Game.Model.blocks[i].type.color) ;
      }
      // drawPiece(Game.Model.currentBlock.type, Game.Model.currentBlock.position.x, Game.Model.currentBlock.position.y, Game.Model.currentBlock.dir, Game.Model.currentBlock.type.color);
    }
    , 100)
  }
  

  //var ctx = canvas[0].getContext("2d");


  function drawBg(){
    canvas.drawRect({
      fillStyle: "black",
      x:0,
      y:0,
      width: canvas.width(),
      height: canvas.height(),
      fromCenter: false,
    });
  };


  function drawPiece(type, x, y, dir, color){
    eachblock(type, x, y, dir, function(x,y){drawBlock( x, y, color);})

  };

  function eachblock(type, x, y, dir, fn) {
     
      var bit, result, row = 0, col = 0, blocks = type.blocks[dir];
      for(bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
        if (blocks & bit) {
          fn(x + col*(1+(canvas.width()*0.4)/4), y + (1+row*(canvas.height()*0.2)/4));
        }
        if (++col === 4) {
          col = 0;
          ++row;
        }
      }
    };

  function drawBlock(x,y,color){
   
    canvas.drawRect({
      strokeStyle: 'white',
      strokeWidth: 2,
      fillStyle: color,
      x: x,
      y: y,
      width:  (canvas.width()*0.4)/4,
      height: (canvas.height()*0.2)/4,
      fromCenter: false,
    });
  };

  return {
    canvas: canvas,
    init: init,
    drawPiece: drawPiece,
    drawBlock: drawBlock,
    drawBg: drawBg,
    eachblock: eachblock
  };
})();

//var renderer = new renderer();
$(document).ready(function(){
    //Draw Board and piece
    Game.Renderer.init();
    //Start listener
    Game.Controller.init();
  })


