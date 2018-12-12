var tiles = [];
var switchqueue = [];
var ripplequeue = [];
var palette = ["#4286f4", "#2e60b2", "#5276af", "#6f91c6", "#3485aa", "#5d8ba0", "#3d85a5", "#5eb8e0", "#1f8aba", "#15a8ea", "#1ec2db", "#44cde2", "#22acc1", "#5096a0", "#85d9e5", "0c6399", "#2d6f99", "#5886a3", "#55ccc0", "#35c6b8", "#04a393", "#46d6c7", "#11c485", "#46ce9e", "#69c6a5", "#56b6ce", "#1fd19e", "#16af84", "#1a8ea8", "#086f8e"]
function setup() {
  for(var i=0; i<window.innerWidth; i+=30){
    for(var j=0; j<window.innerHeight; j+=30){
      tiles.push(new Tile(i, j));
    }
  }
  createCanvas(window.innerWidth, window.innerHeight);
  console.log(window.innerWidth);
  //get the instruction element and change the opacity to 0
}

function draw() {
  background(0, 0, 0, 30);
  tiles.forEach(function(tile) {
    tile.check();
  });
  switchqueue.forEach(function(tile) {
    tile.display();
  });
  ripplequeue.forEach(function(tile) {
    tile.display();
  });
}

function Tile(xcoord, ycoord) {
  this.x = xcoord;
  this.y = ycoord;
  this.color = color(palette[Math.floor(Math.random()*palette.length)]);
  this.check = function() {
    if(mouseX >= this.x && mouseX <= this.x + 30 && mouseY >= this.y && mouseY <= this.y + 30){
      switchqueue.push(this);
      setTimeout(() => switchqueue.shift(), 5000);
      return true;
    }
  };
  this.display = function() {
      noStroke();
      fill(this.color);
      rect(this.x, this.y, 30, 30);
  }
}
$(".boxtest").on("mouseenter", function () {
    $(".boxtest").addClass('permahover');
});
async function mouseClicked() {
  tiles.forEach(async function(tile) {
    if(tile.check() == true){
      tiles.forEach(async function(rip) {
        if(Math.abs(tile.x-rip.x)<100 && Math.abs(tile.y-rip.y)<100 && Math.random()<0.5){
          ripplequeue.push(rip);
          setTimeout(() => ripplequeue.shift(), 500);
        }
        await delay(200);
        if(Math.abs(tile.x-rip.x)>100 && Math.abs(tile.x-rip.x)<200 && Math.abs(tile.y-rip.y)>100 && Math.abs(tile.y-rip.y)<200 && Math.random()<0.3){
          ripplequeue.push(rip);
          setTimeout(() => ripplequeue.shift(), 500);
        }
        await delay(200);
        if(Math.abs(tile.x-rip.x)>200 && Math.abs(tile.x-rip.x)<300 && Math.abs(tile.y-rip.y)>200 && Math.abs(tile.y-rip.y)<300 && Math.random()<0.1){
          ripplequeue.push(rip);
          setTimeout(() => ripplequeue.shift(), 500);
        }
      });
    }
  });
}

function keyPressed() {
  if (key == ' ') {
  }
  else {
    var tile = tiles[Math.floor(Math.random()*tiles.length)];
    switchqueue.push(tile);
    setTimeout(() => switchqueue.shift(), 3000);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Hiding Text
function hideButton() {
  var x = document.getElementById("intro");
  if (x.style.display === "none") {
    x.style.display = "visible";
  } else {
    x.style.display = "none";
  }
}