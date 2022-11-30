//imports
//import { BookmarkBar } from './Javascript/BookmarkBar.js' 


// sample data
let sampleListObj = [{
   type : "Bookmark",
   obj : {
      link : "../HTML/classexample.html",
      name : "My Class"
   }
}, {
   type : "Bookmark",
   obj : {
      link : "../HTML/assignmentexample.html",
      name : "My Assignment"
   }

}, {
   name : "Class Folder",
   type : "Folder",
   obj : 
      [{
         link : "../HTML/classexample.html",
         name : "My Class"
      }, {
         link : "../HTML/classexample.html",
         name : "My Class"
      }]
}]

//window Listeners
window.onload = function () { mainActivity() };
window.onscroll = function() { barScroll() };


// Get the navbar pos and element
var navbar = document.getElementById("bookmarkbar");
var sticky = navbar.offsetTop;

//Get Ribbon elements
let clickedId;
var elements = document.getElementsByClassName("ribbon");

//Listeners
//-------------------------Edit Box Listeners------------------------------
for(var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', displayEditBox, false);    
  // elements[i].addEventListener("click", () => clickedId = elements[i].id); 
}
if(elements.length > 0){
  elements[0].addEventListener("click", () => clickedId = elements[0].id); 
  if(elements.length > 1){
    elements[1].addEventListener("click", () => clickedId = elements[1].id); 
    if(elements.length > 2){
      elements[2].addEventListener("click", () => clickedId = elements[2].id); 
    }
  }
  doneButton.addEventListener("click", () => doneButtonFunction(clickedId));
  removeButton.addEventListener("click", () => removeButtonFunction(clickedId));
}

//-------------------------Edit Box Listeners------------------------------

//Functions
//main Activitiy all onload activities
function mainActivity() {

  addLinks(sampleListObj);

}

function addLinks(bookmarks) {
  var htmlString = "";
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].type == "Bookmark") {
      htmlString = htmlString + "<a href=\"" + bookmarks[i].obj.link + "\" class=\"item\">" + bookmarks[i].obj.name + "</a>\n";
    }
  }
  console.log(htmlString);

  document.getElementById('links').innerHTML = htmlString;
}


// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function barScroll() {
  // Get the offset position of the navbar
  
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}


$(document).bind("contextmenu",function(e){
  return false;
});

$(document).ready(function(){
  $('#links').mousedown(function(event) {
    switch(event.which) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            myFunction();
            break;
        default:
            break;
      }
    });
});



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





  newFolderButton.addEventListener("click", () => addBookMarkFolder());

  function addBookMarkFolder() {
    var x = document.getElementById("BookMarkFolderView");
    var option = document.createElement("option");
    var name = prompt("Enter Name");
    option.text = name;
    x.add(option);

  }

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




