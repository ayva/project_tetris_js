
var Game = Game || {};

Game.Block = (function(){


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

  

})();
