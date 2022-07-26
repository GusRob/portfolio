// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickyCheck()};

// Get the title
var header = document.getElementById("header");
// Get the navbar
var main = document.getElementById("main");

// Get the offset position of the navbar
var sticky = header.offsetTop + (1/10) * window.innerHeight;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyCheck() {
  if (window.pageYOffset >= sticky) {
    header.classList.add("fix")
    main.classList.add("offset")
  } else {
    header.classList.remove("fix");
    main.classList.remove("offset")
  }
}
