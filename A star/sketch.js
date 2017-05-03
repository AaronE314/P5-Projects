var closedSet = []; var openSet = [];var path = [];

var cols = 25;
var rows = 25;
var start, end,w,h,mouseDown,img,done=false;

var started = false;

var grid = new Array(cols);

var randPercent = 0.3;

var bReset,bStart,bRandom;

var firstClick,SecondClick;

// function preload(){
//   img = loadImage('img/maze2.png');
// }

function setup() {
  //Creating Buttons and canvas
  createCanvas(600,600);
  bReset = createButton("Reset");
  bStart = createButton("Start");
  bRandom = createButton("Random");

  w = width/cols;
  h = height/rows;



  bReset.mousePressed(reset);
  bStart.mousePressed(start);
  bRandom.mousePressed(randWall);

  reset();

}

function draw() {

  //algo started
  if(started){

    //while there is still stuff in the open set
    if(openSet.length > 0){


      //find the best value in the openset
      var lowest = 0;

      for(var i = 0; i<openSet.length; i++){
        if(openSet[i].f < openSet[lowest].f){
          lowest = i;
        }
      }

      //get the best value
      var current = openSet[lowest];

      //if end then we are done
      if(current === end){

        //trace best path
        reconstruct_path();
        //console.log("DONE!");
        done=true;
        started = false;
      }

      //remove the value from the openlist and add to the closed list
      removeFromArray(openSet,current);
      closedSet.push(current);

      //for all neighbors of current
      var neighbors = current.neighbors;
      for(var i = 0; i<neighbors.length; i++){
        var neighbor = neighbors[i];

        //checking if the neighbor is in the closed set
        if(closedSet.includes(neighbor) || neighbor.wall){
          continue;
        }

        //calculate the g value
        tempG = current.g + heuristic(current,neighbor);

        //check if the neighbor is not in openset
        if(!openSet.includes(neighbor)){
          openSet.push(neighbor);
        } else if (tempG > neighbor.g) {
          //if it is and the g value is better ignore it
          continue;
        }

        //if it got here its good so set all the values
        neighbor.parent = current;
        neighbor.g = tempG;
        neighbor.h = heuristic(neighbor,end);
        neighbor.f = neighbor.g + neighbor.h;

      }

    } else {
      //ERROR
      console.log('no solution');
      started = false;
      return;
    }
  }

  if(mouseDown){
    for(var i = 0; i<cols; i++){
      for(var j = 0; j<rows; j++){
        grid[i][j].clicked();
      }
    }
  }

  background(0);

  show();


  //img(img,0,0);
}

function show(){
  for(var i = 0; i<cols; i++){
    for(var j = 0; j<rows; j++){
      grid[i][j].show(color(255));
    }
  }

  for(var i = 0; i<closedSet.length; i++){
    closedSet[i].show(color(255,0,0));
  }

  for(var i = 0; i<openSet.length; i++){
    openSet[i].show(color(0,255,0));
  }

  for (var i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255));
  }

  if(start){start.show(color(0,255,255));}
  if(end){end.show(color(255,0,255));}
}

function mousePressed(){
  mouseDown = true;
}

function mouseReleased(){
  mouseDown = false;
}

function reconstruct_path(){

  var temp = end;
  path.push(temp);
  while (temp.parent) {
    path.push(temp.parent);
    temp = temp.parent;
  }
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
       grid[i][j].addNeighbors(grid);
     }
   }

   openSet = [];
   closedSet = [];

   start = grid[0][0];
   end = grid[cols-1][rows-1];

   firstClick = false;
   SecondClick = false;

   //openSet.push(start);
   path = [];

   started = false;

   done=false;
}

function start(){
  if(!start){
    start = grid[0][0];
  }
  if(!end){
    end = grid[cols-1][rows-1];
  }
  if(done){
    reset();
  }

  openSet.push(start);

  started = true;
}

function randWall(){
  reset();
  for(var i = 0; i<cols; i++){
    for(var j = 0; j<rows; j++){
      if(grid[i][j] != start && grid[i][j] != end){
        grid[i][j].randWall();
      }
    }
  }
}

function removeFromArray(arr, elt) {
  // Could use indexOf here instead to be more efficient
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  //var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}
