var scrollIndicatorUp = document.getElementById("scrollUp");
var scrollIndicatorDown = document.getElementById("scrollDown");

var scrollIndicatorPos = [0, -1, 0];
var extLinksPos = [1, -1, 1];
var githubLinksDest = [
  "https://github.com/GusRob",
  "https://github.com/GusRob/Wordle",
  "https://github.com/GusRob"];

var lastscroll = 0;



function scrollHandle(){
  var scroll = window.scrollY;
  var step = window.innerHeight;

  if(scroll < 10 && window.location.href.endsWith("#footer")){
    window.location.href = '/';
  }


  var diff = Math.abs((scroll % step)-(step/2))/step * 2;
  var scrollIndicator = document.getElementById("scrollIndicator");
  var extLinks = document.getElementById("extLinks");
  var githubLinkDest = document.getElementById("githubLinkDest");



  scrollIndicator.style.opacity = String((diff**7));
  extLinks.style.opacity = String((diff**7));

  if(scroll < step/2){
    scrollIndicatorUp.style.opacity = "0";
  } else {
    scrollIndicatorUp.style.opacity = "1";
  }

  if(scroll > step*(scrollIndicatorPos.length-1.5)){
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
  var scrollPos = scrollIndicatorPos[page];
  var linksPos = extLinksPos[page];


  if (window.matchMedia("(max-width: 768px)").matches) {
    scrollIndicator.style.margin = "0 49vw";
    extLinks.style.margin = "0 90vw";
  } else {
    if(scrollPos == -1){
      scrollIndicator.style.margin = "0 24vw";
    } else if(scrollPos == 1){
      scrollIndicator.style.margin = "0 74vw";
    } else {
      scrollIndicator.style.margin = "0 49vw";
    }
    if(linksPos == -1){
      extLinks.style.margin = "0 2.5vw";
    } else if(linksPos == 1){
      extLinks.style.margin = "0 95vw";
    }
  }


  githubLinkDest.href = githubLinksDest[page];

  lastscroll = scroll;
}


scrollHandle();
document.addEventListener("scroll", scrollHandle);
document.addEventListener("resize", scrollHandle);
