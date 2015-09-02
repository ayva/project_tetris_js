
var Game = Game || {};

Game.Controller = (function(){
  
  var dir = 0;

  function moveLeft(){
    console.log("Moved left");
    //if in boundrar?
      //
     model.currentBlock.position.x -= 35;
      
  }

  function rotatePiece(){
    
    model.currentBlock.dir+=1
    if (model.currentBlock.dir>3) {
      model.currentBlock.dir=0
    }
    
  }

  function moveRight(){
    console.log("Move right")
    //checkbound
    model.currentBlock.position.x += 35;
    
  }

  function moveDown(){
    //check bound
    model.currentBlock.position.y += 35;
  }
  

  var score = 0
  var keys = {  37: moveLeft,
          38: rotatePiece,
          39: moveRight,
          40: moveDown
        };
  function init(){
    $(document).keydown(function(e){
      if (keys[e.keyCode]){
        keys[e.keyCode]();
      }

    })
  };
  
  function play(){
    renderer.init();
    controller.init();

  };
  
  return {
    init: init,
    play: play,

  };
})();