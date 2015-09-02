
var Game = Game || {};

Game.renderer = (function(){
 
  var canvas;

  function init(){
    canvas = $("#canvas");

    model.createBlock();
    setInterval(function(){
      renderer.drawBg();
      renderer.drawPiece(model.currentBlock.type, model.currentBlock.position.x, model.currentBlock.position.y, model.currentBlock.dir) 
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


  function drawPiece(type, x, y, dir){
    eachblock(type, x, y, dir, function(x,y){drawBlock( x, y, model.currentBlock.type.color);})

  };

  function eachblock(type, x, y, dir, fn) {
     
      var bit, result, row = 0, col = 0, blocks = type.blocks[dir];
      for(bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
        if (blocks & bit) {
          fn(x + col*(canvas.width()*0.4)/4, y + row*(canvas.height()*0.2)/4);
        }
        if (++col === 4) {
          col = 0;
          ++row;
        }
      }
    };

  function drawBlock(x,y,color){
      console.log("drawing block")
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
    init: init,
    drawPiece: drawPiece,
    drawBlock: drawBlock,
    drawBg: drawBg
  };
})();

//var renderer = new renderer();
$(document).ready(function(){
    Game.Controller.init();
    Game.Controller.play();
  })


