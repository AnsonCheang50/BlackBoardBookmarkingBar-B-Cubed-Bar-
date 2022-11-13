//Storage of links, static values for now

let bookmarks = [
  {
    "link" : "../HTML/classexample.html",
    "name" : "My Class"
  },
  {
    "link" : "../HTML/assignmentexample.html",
    "name" : "Bookmarked Assignment"
  }
  ]

window.onload = function () {addLinks()};
window.onscroll = function() {barScroll()};


// Get the navbar
var navbar = document.getElementById("bookmarkbar");
var sticky = navbar.offsetTop;


// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function barScroll() {
  // Get the offset position of the navbar
  
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

function addLinks() {


  var htmlString = "";
  for (let i = 0; i < bookmarks.length; i++) {
    htmlString = htmlString + "<a href=\"" + bookmarks[i].link + "\">" + bookmarks[i].name + "</a>\n";
  }
  console.log(htmlString);

  document.getElementById('bookmarkbar').innerHTML = htmlString;
}




function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

