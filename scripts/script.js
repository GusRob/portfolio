const canvas = document.getElementById("background");
const context = canvas.getContext("2d");

var seed = [...Array(50)].map(()=>{return Math.floor(Math.random()*10)/5000});
var snow = [];
var count = 1;
var moveInterval = 20;
var spawnInterval = 50;
var maxSnowflakes = 30
var lastSpawn = 0;

setSize();
drawBackground("FF");
anim();

addEventListener("resize", () => setSize());

function setSize() {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  drawBackground("FF");
}

function anim() {
  requestAnimationFrame(anim);
  drawBackground("09");
  count++;
}

function addBezCurveToRegion(region, cx1, cy1, cx2, cy2, x, y){
  cx1 *= innerWidth;
  cx2 *= innerWidth;
  x *= innerWidth;
  cy1 *= innerHeight;
  cy2 *= innerHeight;
  y *= innerHeight;

  region.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
}

function drawBackground(fillOp){
  drawSnow();
  drawMountains(fillOp);
  drawCloud(innerWidth/4, innerHeight/7);
  drawCloud(innerWidth*3/5, innerHeight/5);
}

function drawSnow(){
  var unit = innerWidth/300;

  for(var i = 0; i < snow.length; i++){
    let region = new Path2D();
    console.debug(snow[i].x);
    region.moveTo(snow[i].x,snow[i].y+unit);
    region.lineTo(snow[i].x,snow[i].y);
    region.lineTo(snow[i].x+unit,snow[i].y);
    region.lineTo(snow[i].x+unit,snow[i].y+3*unit);
    region.lineTo(snow[i].x,snow[i].y+3*unit);
    region.lineTo(snow[i].x,snow[i].y+unit);
    region.lineTo(snow[i].x-unit,snow[i].y+unit);
    region.lineTo(snow[i].x-unit,snow[i].y+2*unit);
    region.lineTo(snow[i].x+2*unit,snow[i].y+2*unit);
    region.lineTo(snow[i].x+2*unit,snow[i].y+unit);
    region.closePath();
    context.fillStyle = "#FFFFFFFF";
    context.fill(region, "evenodd");

    if(count%moveInterval == 0){
      snow[i].x += (Math.floor(Math.random()*5)-2)*unit;
      snow[i].y += unit*3;
      if(snow[i].y > innerHeight){
        if (snow[i].i == 0){
          snow[i].x = (innerWidth/4) + (Math.floor(Math.random()*8))*unit;
          snow[i].y = innerHeight/7;
        } else {
          snow[i].x = (innerWidth*3/5) + (Math.floor(Math.random()*8))*unit;
          snow[i].y = innerHeight/5;
        }
      }
    }
  }

  if(snow.length < maxSnowflakes){
    if(count%spawnInterval == 0){
      var tmpSnow = {x: 0, y: 0, i: 0};
      if (lastSpawn == 0){
        tmpSnow.i = 0;
        tmpSnow.x = (innerWidth/4) + (Math.floor(Math.random()*20))*unit;
        tmpSnow.y = innerHeight/7;
        lastSpawn = 1;
      } else {
        tmpSnow.i = 1;
        tmpSnow.x = (innerWidth*3/5) + (Math.floor(Math.random()*20))*unit;
        tmpSnow.y = innerHeight/5;
        lastSpawn = 0;
      }
      snow.push(tmpSnow);
    }
  }
}

function drawMountains(fillOp){
  let region = new Path2D();
  region.moveTo(0, innerHeight*0.175);
  addBezCurveToRegion(region, 0.125, 0.2, 0.15, 0.3, 0.18, 0.4);
  addBezCurveToRegion(region, 0.21, 0.5, 0.3, 0.7, 0.4, 0.75);
  addBezCurveToRegion(region, 0.45, 0.775, 0.55, 0.775, 0.6, 0.75);
  addBezCurveToRegion(region, 0.7, 0.7, 0.79, 0.5, 0.82, 0.4);
  addBezCurveToRegion(region, 0.85, 0.3, 0.875, 0.2, 1, 0.175);
  region.lineTo(innerWidth, innerHeight);
  region.lineTo(0, innerHeight);
  region.closePath();
  context.fillStyle = "#FFFFFF" + fillOp;
  context.fill(region, "evenodd");

  region = new Path2D();
  region.moveTo(0, innerHeight*0.175);
  addBezCurveToRegion(region, 0.125, 0.2, 0.15, 0.3, 0.18, 0.4);
  addBezCurveToRegion(region, 0.21, 0.5, 0.3, 0.7, 0.4, 0.75);
  addBezCurveToRegion(region, 0.45, 0.775, 0.55, 0.775, 0.6, 0.75);
  addBezCurveToRegion(region, 0.7, 0.7, 0.79, 0.5, 0.82, 0.4);
  addBezCurveToRegion(region, 0.85, 0.3, 0.875, 0.2, 1, 0.175);
  region.lineTo(innerWidth, 0);
  region.lineTo(0, 0);
  region.closePath();
  context.fillStyle = "#96D2FF" + fillOp;
  context.fill(region, "evenodd");
}

function drawCloud(x, y){
  var scale = Math.min(innerHeight, innerWidth)*0.00075;
  let region = new Path2D();
  region.arc(x, y, 60*scale, Math.PI * 0.5, Math.PI * 1.5);
  region.arc(x + 70*scale, y - 60*scale, 70*scale, Math.PI * 1, Math.PI * 1.85);
  region.arc(x + 152*scale, y - 45*scale, 50*scale, Math.PI * 1.37, Math.PI * 1.91);
  region.arc(x + 200*scale, y, 60*scale, Math.PI * 1.5, Math.PI * 0.5);
  region.moveTo(x + 200*scale, y + 60*scale);
  region.lineTo(x, y + 60*scale);
  context.fillStyle = "#FFFFFFFF";
  context.fill(region, "nonzero");
}
