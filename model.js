var Game = Game || {};

Game.Model = (function(){

  var model = {};
  
  model.blocks = [];
  model.currentBlock = {};

  model.createBlock = function(){
    var block = new Block();
    model.blocks.push(block);
    model.currentBlock = block;

    console.log(model.currentBlock);
  };

  model.sampleBlocks = {
    1: { blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan'   },
    2: { blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   },
    3: { blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' },
    4: { blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' },
    5: { blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  },
    6: { blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' },
    7: { blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    }
  };


  model.takeSampleBlock = function(number){
    return model.sampleBlocks[number];
    // return model.sampleBlocks[1]
  };

  return model;

})();


