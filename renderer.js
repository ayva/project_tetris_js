
var Game = Game || {};

Game.Renderer = (function(){
 
  var canvas = $("#canvas");
  var blockwidth = canvas.width()*0.4/4;
  var blockheight = canvas.height()*0.2/4;
  var motion = undefined;
  var rendering = undefined;

  function init(){

    Game.Model.createBlock();


    //Rendering setup
    Game.Renderer.rendering = setInterval(function(){
      drawBg();
      drawShapes();
      drawScore();
      //Stop intervals if game is over
      if(Game.Controller.gameOver()){
        window.clearInterval(Game.Renderer.rendering);
        window.clearInterval(Game.Renderer.motion);
      }
    }, 100)
    //Auto drop setup
    Game.Renderer.motion = setInterval(function(){
      Game.Controller.moveDown();
    },1000)
  }
  
  function drawScore(){
    $("#score").text("Score: " + Game.Controller.score)
  }

  
  function drawShapes(){
    for(var i = 0; i < Game.Model.blocks.length; i++){
      drawPiece(Game.Model.blocks[i]) ;
    }
  }

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

  function drawPiece(block){
    if(!block.position) return "No blocks to render"
    var type = block.type
    var x = block.position.x
    var y = block.position.y
    var dir = block.dir
    var color = block.type.color
    
    eachblock(type, x, y, dir, function(x,y){drawBlock(x, y, color);})

  };

  function drawBlock(x,y,color){
   
    canvas.drawRect({
      strokeStyle: 'white',
      strokeWidth: 2,
      fillStyle: color,
      x: x,
      y: y,
      width:  blockwidth,
      height: blockheight,
      fromCenter: false,
    });
  };

  function eachblock(type, x, y, dir, fn) {  
      var bit, result, row = 0, col = 0, blocks = type.blocks[dir];
      for(bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
        if (blocks & bit) {
          fn(x + col*blockwidth, y + row*blockheight);
        }
        if (++col === 4) {
          col = 0;
          ++row;
        }
      }
    };


  return {
    canvas: canvas,
    init: init,
    drawPiece: drawPiece,
    drawBlock: drawBlock,
    drawBg: drawBg,
    eachblock: eachblock,
    motion: motion,
    rendering: rendering,
  };
})();



