const canvas = document.getElementById('frontpageCanvas');
const context = canvas.getContext('2d');
let mouse_x = 0;
let mouse_y = 0;

//dot formation

var dotsX = [-0.18, -0.15, -0.12, -0.09, -0.06, -0.03,  0.02,  0.07,  0.10,  0.13,  0.16, 0.19, 0.22, -0.03, 0.06];
var dotsY = [0.15,      0, -0.15, -0.30, -0.45, -0.60, -0.75, -0.60, -0.45, -0.30, -0.15,    0, 0.15, -0.10, -0.10];
let count = dotsX.length;

//DOT CONTROL

class Dot {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
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
    dots[i] = new Dot(window.innerWidth/2 + (dotsX[i] * window.innerWidth/10), window.innerHeight*5/16 + (dotsY[i] * window.innerHeight/10), 5);
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

    if(dotToStartDist > 1){
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
  context.fillStyle = '#fa0';
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = '#fa0';
  context.stroke();
}



//EVENT LISTENERS

window.addEventListener('resize', resizeCanvas, true);

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

var interval = setInterval(function () { moveDots(); }, 10);
