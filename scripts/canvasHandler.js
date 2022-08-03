const canvas = document.getElementById('frontpageCanvas');
const context = canvas.getContext('2d');
let mouse_x = 0;
let mouse_y = 0;

var scrollHeight = window.scrollY;


//dot formation

var dotsXY = [
  [-0.24, 0.45],
  [-0.21, 0.3],
  [-0.18, 0.15],
  [-0.15, 0],
  [-0.12, -0.15],
  [-0.09, -0.3],
  [-0.06, -0.45],
  [-0.03, -0.6],
  [0.02, -0.75],
  [0.07, -0.6],
  [0.10, -0.45],
  [0.13, -0.3],
  [0.16, -0.15],
  [0.19, 0],
  [0.22, 0.15],
  [0.25, 0.3],
  [0.28, 0.45],

  [0.07, -0.02],
  [-0.04, -0.02],
  [0.12, 0.15],
  [0.02, 0.15],
  [-0.08, 0.15],

  [-0.34, 0.45],
  [-0.31, 0.3],
  [-0.28, 0.15],
  [-0.25, 0],
  [-0.22, -0.15],
  [-0.19, -0.3],
  [-0.16, -0.45],
  [-0.13, -0.6],
  [-0.09, -0.75],
  [-0.04, -0.9],
  [0.07, -0.9],
  [0.12, -0.75],
  [0.17, -0.6],
  [0.20, -0.45],
  [0.23, -0.3],
  [0.26, -0.15],
  [0.29, 0],
  [0.32, 0.15],
  [0.35, 0.3],
  [0.38, 0.45]

]
let count = dotsXY.length;

//DOT CONTROL

class Dot {
  constructor(x, y, size) {
    var edge = Math.floor(Math.random() * 4);
    this.x = (edge == 2 ? window.innerWidth : 0);
    this.y = (edge == 0 ? window.innerHeight : 0);
    if(edge == 0 || edge == 1){
      this.x = Math.floor(Math.random()*window.innerHeight);
    } else {
      this.y = Math.floor(Math.random()*window.innerHeight);
    }
    this.size = size;
    this.startX = x;
    this.startY = y;
    this.dx = 0
    this.dy = 0
  }
}

var dots = new Array(count);
setDots();

function setDots(){
  let i = 0;
  while(i < count){
    dots[i] = new Dot(window.innerWidth/2 + (dotsXY[i][0] * window.innerWidth/10), window.innerHeight*5/16 + (dotsXY[i][1] * window.innerHeight/10), 5);
    i++;
  }
}


function moveDots() {
  for(var i = 0; i < dots.length; i++) {
    mouseToDotX = dots[i].x-mouse_x;
    mouseToDotY = dots[i].y-mouse_y;
    mouseToDotDist = Math.sqrt((mouseToDotX)**2 + (mouseToDotY)**2);
    dotToStartX = dots[i].startX-dots[i].x;
    dotToStartY = dots[i].startY-dots[i].y;
    dotToStartDist = Math.sqrt((dotToStartX)**2 + (dotToStartY)**2);

    mouseToDotX = mouseToDotX/mouseToDotDist;
    mouseToDotY = mouseToDotY/mouseToDotDist;
    dotToStartX = dotToStartX/dotToStartDist;
    dotToStartY = dotToStartY/dotToStartDist;

    if(dotToStartDist > 0.5){
      dots[i].dx += (dotToStartX)*(dotToStartDist/100);
      dots[i].dy += (dotToStartY)*(dotToStartDist/100);
    }
    if(mouseToDotDist < 100){
      dots[i].dx += (mouseToDotX)*(100/mouseToDotDist);
      dots[i].dy += (mouseToDotY)*(100/mouseToDotDist);
    }

    dots[i].x += dots[i].dx;
    dots[i].y += dots[i].dy;
    dots[i].dx *= 0.95;
    dots[i].dy *= 0.95;
  }
  drawDots();
}


//HELPERS


function drawDots() {

  context.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < dots.length; i++) {
    drawDot(context, dots[i]);
  }
}

function drawDot(context, dot) {
  context.beginPath();
  context.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI, false);
  var val = ((dot.startX - 400)/400)%1000;
  context.fillStyle = '#e80';
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = '#e80';
  context.stroke();
}



//EVENT LISTENERS

window.addEventListener('resize', windowSizeChange, true);

function windowSizeChange(){
  resizeCanvas();
  setDots();
}

function resizeCanvas() {
  canvas.width = window.innerWidth-1;
  canvas.height = window.innerHeight-1;
  drawDots();
}
resizeCanvas();

canvas.addEventListener('mousemove', (e) => {
  resizeCanvas();
  mouse_x = e.offsetX;
  mouse_y = e.offsetY;
});

var interval = setInterval(function () {moveDots();}, 10);
