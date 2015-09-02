



var renderer = (function(){
 
  var canvas;

  function init(){
    canvas = $("#canvas");

    model.createBlock();
    setInterval(function(){
      renderer.drawBg();
      var dir = model.currentBlock.dir;
      console.log(model.currentBlock.type.blocks[dir])
      var piece = convertToArray(model.currentBlock.type.blocks[dir]);
      // console.log(model.currentBlock.position.x)
      console.log(model.currentBlock.type.color)
      // console.log(model.currentBlock.position.y)
      drawArray(piece, model.currentBlock.position.x, model.currentBlock.position.y, "green")

      // renderer.drawPiece(model.currentBlock.type, model.currentBlock.position.x, model.currentBlock.position.y, model.currentBlock.dir) 
    }
    , 100)
  }
  

  //var ctx = canvas[0].getContext("2d");

  function  convertToArray(hex){
    console.log(hex)

  };

  function drawArray(piece, x,y,color){
    // console.log("drawing")
    // console.log(canvas.height()/20/4)
    // console.log(canvas.width()/10/4)
    //var piece = [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]

    for(var row=0; row < piece.length; row++){
      for(var col=0; col < piece.length; col++){
        if(piece[row][col]===1) {drawBlock(100+col*canvas.width()/10/4,100+row*canvas.height()/20/4, color)}
      }
    }
  };

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
          fn(x + col, y + row);
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
      width:  canvas.width()/10/4,
      height: canvas.height()/20/4,
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

var Block = function(){


  this.position = {
    x: 350,
    y: 350
  };

  this.velocity = 0;
  this.dir = 0;

  this.type = model.takeSampleBlock(Math.ceil(Math.random()*7));

  this.eachblock = function(type, x, y, dir, fn) {
      var bit, result, row = 0, col = 0, blocks = type.blocks[dir];
      for(bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
        if (blocks & bit) {
          fn(x + col, y + row);
          console.log(bit);
        }
        if (++col === 4) {
          col = 0;
          ++row;
      }
    }
  };

  this.occupied = function(type, x, y, dir) {
    var result = false;
    this.eachblock(type, x, y, dir, function(x, y) {
      if ((x < 0) || (x >= nx) || (y < 0) || (y >= ny) || getBlock(x,y))
        result = true;
    });
    return result;

  };

  this.unoccupied = function(type, x, y, dir) {
    return !occupied(type, x, y, dir);
  };

  //returns true if space is occupied by another blokc
  this.getBlock = function(x, y){
    
    for(var i = 0; i < model.blocks.length; i++){
      if(model.blocks[i].position.x === x || model.blocks[i].position.y === y){
        return true;
      }
      else{
        return false;
      }
    }
  };

};



var model = {
  blocks: [],
  currentBlock: {},

  createBlock: function(){
    var block = new Block();
    model.blocks.push(block);
    model.currentBlock = block;
<<<<<<< HEAD
    console.log(model.currentBlock.type)
=======
    console.log(model.currentBlock)
>>>>>>> 0dce58b0e6cbed80e47cfccb41b709070ac30600
  },

  sampleBlocks: {
    // 1: { blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan'   },
    1: { blocks: [0x0F00], color: 'cyan'   },
    2: { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   },
    3: { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' },
    4: { blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' },
    5: { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  },
    6: { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' },
    7: { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    }
  },


  takeSampleBlock: function(number){
    // return model.sampleBlocks[number]
    return model.sampleBlocks[1]
  }

};

var controller = (function(){
  var dir = 0

<<<<<<< HEAD
  moveLeft: function(){
    model.currentBlock.position.x -= 35;
  },

  rotatePiece: function(){
    console.log(model.currentBlock.dir);
    model.currentBlock.dir+=1;
    if (model.currentBlock.dir>3) {
      model.currentBlock.dir=0;
    }
  },

  moveRight: function(){
    model.currentBlock.position.x += 35;
  },

  moveDown: function(){
    model.currentBlock.position.y += 35;
  },
  

  score : 0,

  init : function(){
    var ctx = $(canvas)[0].getContext("2d")
    var keys= {  37: this.moveLeft,
          38: this.rotatePiece,
          39: this.moveRight,
          40: this.moveDown
        };
    
    var renderer = new Renderer($("canvas"));

    model.createBlock();
    
    setInterval(function(){
      renderer.drawBg();
      renderer.drawPiece(ctx, model.currentBlock);
    }, 100);
=======
  function moveLeft(){
    console.log("Moved left")
    model.currentBlock.position.x -= 35;
    
  }

  function rotatePiece(){
    console.log("Rotated")
    
    model.currentBlock.dir+=1
    if (model.currentBlock.dir>3) {
      model.currentBlock.dir=0
    }
    
  }

  function moveRight(){
    console.log("Move right")
    model.currentBlock.position.x += 35;
    
  }

  function moveDown(){
    model.currentBlock.position.y += 35;
  }
  

  var score = 0
  var keys = {  37: moveLeft,
          38: rotatePiece,
          39: moveRight,
          40: moveDown
        };
  function init(){
>>>>>>> 0dce58b0e6cbed80e47cfccb41b709070ac30600

    $(document).keydown(function(e){
      if (keys[e.keyCode]){
        keys[e.keyCode]();
      }
<<<<<<< HEAD
    });
  },
=======
    })
  };
  function play(){
    renderer.init();
    controller.init();
>>>>>>> 0dce58b0e6cbed80e47cfccb41b709070ac30600

  };
  return {
    init: init,
    play: play,

  };
   
})();


   


//var renderer = new renderer();
$(document).ready(function(){
    controller.play();
  })


