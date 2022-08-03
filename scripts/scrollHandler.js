var scrollIndicatorUp = document.getElementById("scrollUp");
var scrollIndicatorDown = document.getElementById("scrollDown");

var noOfPages = 4

var positionOnPage = [0, -1, 0, 0];

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

  if(scroll > step*(noOfPages-1.5)){
    scrollIndicatorDown.style.opacity = "0";
  } else {
    scrollIndicatorDown.style.opacity = "1";
  }

  var page = 0;
  var div = (scroll/step)-0.5
  if(Math.ceil(div) < Math.floor(div)){
    page = Math.ceil(div);
  } else {
    page = Math.floor(div);
  }
  page = page+1;
  var scrollPos = positionOnPage[page];
  console.debug(scrollPos);
  if(scrollPos == -1){
    scrollIndicator.style.margin = "0 25vw";
  } else if(scrollPos == 1){
    scrollIndicator.style.margin = "0 75vw";
  } else {
    scrollIndicator.style.margin = "0 50vw";
  }
}




var interval = setInterval(function(){scrollIndicator();}, 10);
