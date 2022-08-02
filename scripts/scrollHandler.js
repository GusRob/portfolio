var scrollIndicatorUp = document.getElementById("scrollUp");
var scrollIndicatorDown = document.getElementById("scrollDown");



function scrollIndicator(){
  var scroll = window.scrollY;
  var step = window.innerHeight;

  var diff = Math.abs((scroll % step)-(step/2))/step * 2;
  var scrollIndicator = document.getElementById("scrollIndicator");
  scrollIndicator.style.opacity = String((diff**6));

  if(scroll < step/2){
    scrollIndicatorUp.style.opacity = "0";
  } else {
    scrollIndicatorUp.style.opacity = "1";
  }

  if(scroll > step*1.5){
    scrollIndicatorDown.style.opacity = "0";
  } else {
    scrollIndicatorDown.style.opacity = "1";
  }
}


var interval = setInterval(function(){scrollIndicator();}, 10);
