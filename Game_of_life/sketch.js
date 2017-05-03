
const cols = 25;
const rows = 25;

var grid = new Array(cols);

var randPercent = 0.3;

var bReset,bStart,bRandom;
var started = false;

function setup() {
  createCanvas(400,400);
  background(51);

  bReset = createButton("Reset");
  bStart = createButton("Start");
  bRandom = createButton("Random");

  bReset.mousePressed(reset);
  bStart.mousePressed(start);
  bRandom.mousePressed(randWall);

  w = width/cols;
  h = height/rows;

  for(var i = 0; i<cols; i++){
     grid[i] = new Array(rows);
   }

   for(var i = 0; i<cols; i++){
     for(var j = 0; j<rows; j++){
       grid[i][j] = new Cell(i,j);
     }
   }

   for(var i = 0; i<cols; i++){
     for(var j = 0; j<rows; j++){
       grid[i][j].addNeighbors();
     }
   }

   for(var i = 0; i< cols; i++){
     grid[i][h/2].alive = true;
     grid[i][h/2].tempA = true;
   }

}

function draw() {
  //background(51);
  if(started){
    for(var i = 0; i<cols; i++){
      for(var j = 0; j<rows; j++){
        grid[i][j].alive = grid[i][j].tempA;
        grid[i][j].show();
      }
    }

    for(var i = 0; i<cols; i++){
      for(var j = 0; j<rows; j++){
        grid[i][j].checkStat();
      }
    }
  }
}

function Cell(i,j) {
  this.alive=false;
  this.tempA = this.alive;
  this.i=i;
  this.j=j;
  this.neighbors=[];

  this.show = function() {
    noStroke();
    if (this.alive){
      fill(0);
    } else {
      fill(255);
    }
    rect(this.i * w,this.j * h,w-1,h-1);
  }

  this.addNeighbors = function(){
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

  this.checkStat = function(){
    var count = 0;
    for(var i = 0; i< this.neighbors.length; i++){
      if(this.neighbors[i].alive){
        count++;
      }
    }

    if(count === 3){
      this.tempA = true
    } else if(count !== 2){
      this.tempA = false
    }
  }

  this.randWall = function(){
    if(random(1)<randPercent){
      this.alive = true;
    }
  }
}

function start(){
  reset();
  started = true;
}

function reset(){
  grid = new Array(cols);
  for(var i = 0; i<cols; i++){
     grid[i] = new Array(rows);
   }

   for(var i = 0; i<cols; i++){
     for(var j = 0; j<rows; j++){
       grid[i][j] = new Cell(i,j);
     }
   }

   for(var i = 0; i<cols; i++){
     for(var j = 0; j<rows; j++){
       grid[i][j].addNeighbors();
     }
   }

   for(var i = 0; i< cols; i++){
     grid[i][h/2].alive = true;
     grid[i][h/2].tempA = true;
   }
}

function randWall(){
  reset();
    for(var i = 0; i<cols; i++){
      for(var j = 0; j<rows; j++){
        grid[i][j].randWall();
      }
    }
}
