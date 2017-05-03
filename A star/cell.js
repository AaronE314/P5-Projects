function Cell(i,j){

  this.i=i;
  this.j=j;

  this.h=0;
  this.f=0;
  this.g=0;

  this.path = false;

  this.neighbors = [];

  this.parent = undefined;

  this.wall = false;

  this.randWall = function(){
    if(random(1)<randPercent){
      this.wall = true;
    }
  }

  this.show = function(col) {
    noStroke();
    if(this.wall){
      fill(0);
    } else{
      fill(col);
    }

    rect(this.i * w,this.j * h,w-1,h-1);
  }

  this.addNeighbors = function(grid){

    var startPosX = (this.i - 1 < 0) ? this.i : this.i-1;
    var startPosY = (this.j - 1 < 0) ? this.j  : this.j-1;
    var endPosX =   (this.i + 1 > cols-1) ? this.i : this.i+1;
    var endPosY =   (this.j + 1 > rows-1) ? this.j  : this.j+1;


    // See how many are alive
    for (var rowNum=startPosX; rowNum<=endPosX; rowNum++) {
      for (var colNum=startPosY; colNum<=endPosY; colNum++) {
          this.neighbors.push(grid[rowNum][colNum]);
        }
      }
  }

  this.clicked = function(){
    if(this.i*w<mouseX && mouseX<this.i*w+w && this.j*h<mouseY && mouseY<this.j*h+h){
      if(firstClick){
        start = grid[this.i][this.j];
        firstClick = false;
        SecondClick = true;
      } else if (SecondClick){
        end = grid[this.i][this.j];
        SecondClick = false;
      } else {
        if(mouseButton == LEFT){
          this.wall = true;
        } else if(mouseButton == CENTER || mouseButton == RIGHT){
          this.wall = false;
        }
      }
    }
  }

}
