var Block = function(){
  //Size of 1 block is 40 px
  console.log("render: " + Renderer.canvas);
  console.log(this);
  this.width = Renderer.canvas.width()/10;
  this.height = Renderer.canvas.height()/20;
};


//View
var Renderer = function(canvas){
  // Cache DOM element
  this.canvas = $(canvas);

  this.drawBg = function(){
    this.canvas.drawRect({
      fillStyle: "black",
      x:0,
      y:0,
      width: this.canvas.width(),
      height:this.canvas.height(),
      fromCenter: false,
    });
  };

  this.drawBlock = function(){
    var block = new Block();
    
    this.canvas.drawRect({
      fillStyle: "white",
      x: 0,
      y: 0,
      width: block.width,
      height: block.height
    });
  };


};

var model = {
  
  currentBlock: {},

  createBlock: function(){
    currentBlock = new Block();
    var width = 20px;
    var height = 20px;
  }


};

var controller = {

  score : 0,
  init : function(){
    var renderer = new Renderer($("canvas"));
    renderer.drawBg();
    renderer.drawBlock();
  }
};

//var renderer = new Renderer($("canvas"));

controller.init();