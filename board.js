
var Game = Game || {};

Game.Board = (function(){

  //Field keeps track of occupied coordinates
  var field = [];
  var blockwidth = Game.Renderer.canvas.width()*0.4/4
  var blockheight = Game.Renderer.canvas.height()*0.2/4
    



  //Checks if blocks occupied by another shape and return boolian
  var takenCoord = function(x,y){
    
    for(var i=0; i<field.length;i++){
      if(field[i] && field[i][0]===x && field[i][1]===y){
        return true
      }
    }
    return false
  }

  var addCoord = function(block){
    //Walks through each block in shape and records coords for occupied blocks
    var type = block.type
    var x = block.position.x
    var y = block.position.y
    var dir = block.dir
    eachblock(type, x, y, dir, function(x,y){
      field.push([x,y])
    })

  }

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

  function BlockVisible(element){  
      result = false
      eachblock(element.type, element.position.x, element.position.y, element.dir, function(x,y) {
        if(y < Game.Renderer.canvas.height()){
          result=true
        }
      })
      return result
  }

  //All occupied blockes stored in field
  function checkBottom(){
    var count = 0
    var y = Game.Renderer.canvas.height()-blockheight
    //Loop through board bottom blocks
    for(var x=0; x<Game.Renderer.canvas.width(); x+=blockwidth){
      //Loop through taken blocks and count bottom one
      for(var b=0; b<field.length; b++){
        if (field[b][0]===x && field[b][1]===y) {
          count++
        }
      }
    }
    
    if (count===10) {return true}
    return false
    
  }




  function shiftBlocksDown(){
    //Update field
    var updatedField = []

    for(var b=0; b<field.length; b++){
      if (field[b][1]+blockheight!==Game.Renderer.canvas.height()){
        field[b][1]+=blockheight;
        updatedField.push(field[b])

      } 
    }
    field = updatedField;

    //Update blocks
    var updatedBlocks = []
    Game.Model.blocks.forEach(function(element, index){
      element.position.y+=blockheight
      //Whole block is under bottom
      if(BlockVisible(element)){
        updatedBlocks.push(element)
      }
    })
    //Alternative score when counting only vanished
    //Game.Controller.score += (Game.Model.blocks.length-updatedBlocks.length);
    
    Game.Model.blocks = updatedBlocks
    
  }


  return {
    takenCoord: takenCoord,
    addCoord: addCoord,
    blockheight: blockheight,
    blockwidth: blockwidth,
    field:field,
    checkBottom: checkBottom,
    shiftBlocksDown: shiftBlocksDown,

    getField: function(){ return field },
    
    setField: function(val){ 
      return field = val;
    },
  }

})();