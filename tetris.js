


//View
var Renderer = function(canvas){
  // Cache DOM element
  this.canvas = $(canvas);
  var ctx = $(canvas)[0].getContext("2d");
  
  this.drawBg = function(){
    this.canvas.drawRect({
      fillStyle: "black",
      x:0,
      y:0,
      width: this.canvas.width(),
      height: this.canvas.height(),
      fromCenter: false,
    });
  };

  this.drawPiece = function(ctx, block){
    //dir is the next position
    var x = block.position.x
    var y = block.position.y
    var that = this

    block.eachblock(block.type, x, y, dir=0, function(x,y){that.drawblock(ctx, x, y, block.type.color);})

  };
  this.drawblock = function(ctx,x,y,color){

    this.canvas.drawRect({
      fillStyle: color,
      x: x,
      y: y,
      width:  35,
      height: 35,
      fromCenter: false,
    });
  }
};


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
  },

  sampleBlocks: {
    1: { blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan'   },
    2: { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   },
    3: { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' },
    4: { blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' },
    5: { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  },
    6: { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' },
    7: { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    }
  },

  takeSampleBlock: function(number){
    return model.sampleBlocks[number]
  }

};

var controller = {
  dir: 0,

  moveLeft: function(){
    console.log("Moved left")
    model.currentBlock.position.x -= 35;
    console.log(currentBlock.position.x)
  },

  rotatePiece: function(){
    console.log("Rotated")
    console.log(currentBlock.dir)
    currentBlock.dir+=1
    if (currentBlock.dir>3) {
      currentBlock.dir=0
    }
    console.log(currentBlock.dir)
  },

  moveRight: function(){
    console.log("Move right")
    currentBlock.position.x += 35;
    console.log( currentBlock.position.x)
  },

  moveDown: function(){
    currentBlock.position.y += 35;
  },
  

  score : 0,

  init : function(){
    var keys= {  37: this.moveLeft,
          38: this.rotatePiece,
          39: this.moveRight,
          40: this.moveDown
        }
    var renderer = new Renderer($("canvas"));

    model.createBlock()
    setInterval(function(){
      renderer.drawBg();
      renderer.drawPiece(renderer.ctx, model.currentBlock) }
    , 100)

    $(document).keydown(function(e){
      if (keys[e.keyCode]){
        keys[e.keyCode]();
      }
    })
  },

   
};

//var renderer = new Renderer($("canvas"));

controller.init();

