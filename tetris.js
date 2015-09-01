var Block = function(){
  //Size of 1 block is 40 px
  width = Renderer.canvas.width()/10
  height = Renderer.canvas.height()/20
}


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
    })
  };
}

var controller = {

  score : 0,
  init : function(){
    var renderer = new Renderer($("canvas"));
    renderer.drawBg();
  }
}

//var renderer = new Renderer($("canvas"));

controller.init();