// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickyCheck()};

// Get the title
var header = document.getElementById("header");
var h_info = document.getElementById("headerInfo");
var main = document.getElementById("main");

// Get the offset position of the navbar
var sticky = header.offsetTop + (2/10) * window.innerHeight;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyCheck() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("fix")
    h_info.classList.add("headerInfoHide")
    main.classList.add("offset")
  } else {
    header.classList.remove("fix");
    h_info.classList.remove("headerInfoHide")
    main.classList.remove("offset")
  }
}
