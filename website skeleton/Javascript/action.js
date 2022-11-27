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


  let clickedId;

  var elements = document.getElementsByClassName("ribbon");


  
  
  for(var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', displayEditBox, false);    
    // elements[i].addEventListener("click", () => clickedId = elements[i].id); 
  }

  elements[0].addEventListener("click", () => clickedId = elements[0].id); 
  elements[1].addEventListener("click", () => clickedId = elements[1].id); 
  elements[2].addEventListener("click", () => clickedId = elements[2].id); 





  doneButton.addEventListener("click", () => doneButtonFunction(clickedId));

  removeButton.addEventListener("click", () => removeButtonFunction(clickedId));

  function doneButtonFunction(clickedId) {
     test = document.getElementById(clickedId);
     test.src = "../image/FilledBookmark.png";

    div = document.getElementById('editBoxContainer');
    div.style.display = "none";
  }


  function removeButtonFunction(clickedId) {
    document.getElementById(clickedId).src = "../image/bookmark.png";
    div = document.getElementById('editBoxContainer');
    div.style.display = "none";
    
  }




  function displayEditBox() {

    


    div = document.getElementById('editBoxContainer');
    if (div.style.display == 'block') {
      div.style.display = "none";
    }
    else {
      div.style.display = "block";

    }

  }




