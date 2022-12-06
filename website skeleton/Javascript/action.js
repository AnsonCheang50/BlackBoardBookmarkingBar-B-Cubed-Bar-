//imports
//import { BookmarkBar } from './Javascript/BookmarkBar.js' 


// sample data
let sampleListObj = [{
  type : "Bookmark",
  obj : {
     link : "../HTML/classexample.html",
     name : "My Class",
     id : "asdf"
  }
}, {
  type : "Bookmark",
  obj : {
     link : "../HTML/assignmentexample.html",
     name : "My Assignment",
     id : "dfg"
  }

}, {
  name : "Class Folder",
  type : "Folder",
  id : "0",
  obj : 
     [{
       type : "Bookmark",
       obj : {
          link : "../HTML/assignmentexample.html",
          name : "Assignment1",
          id : "qwe"
       }
    
    },
    {
     type : "Bookmark",
     obj : {
        link : "../HTML/assignmentexample.html",
        name : "Assignment2",
        id : "dfewqeg"
     }
  
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
async function mainActivity() {

  await addLinks(sampleListObj);
  setUpBookmarkBar();
  setUpBBBBEditBox();
  updateFolderDisplay();

}

function addLinks(bookmarks) {
  var htmlString = "";
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].type == "Bookmark") {
      htmlString = htmlString + "<a href=\"" + bookmarks[i].obj.link + "\" class=\"bookmarkOnBar bookMarkItems\" id=\"" + bookmarks[i].obj.id + "\">" + bookmarks[i].obj.name + "</a>\n";
    }
    else if (bookmarks[i].type == "Folder") {
      
      htmlString = htmlString + "<div onclick=\"folderDropdown("+ bookmarks[i].id +")\" class=\"bookmarkFolder bookMarkItems\" id=\"" + bookmarks[i].id + "\">" + bookmarks[i].name + "</div>\n";
      htmlString = htmlString + "<div class=\"folderDDItem\" id=\"" + bookmarks[i].id + "\">\n";
      for (var j = 0; j < bookmarks[i].obj.length; j++) {
        htmlString = htmlString + "<a class=\"folderItem bookMarkItems\" id=\"" + bookmarks[i].obj[j].obj.id + "\" href=\"" +  bookmarks[i].obj[j].obj.link + "\">" + bookmarks[i].obj[j].obj.name + "</a>\n";
      }
      htmlString = htmlString + "</div>";
    }

  }

  document.getElementById('links').innerHTML = htmlString;

  return;
}

function folderDropdown(folderID) {
  let folder = document.getElementById(folderID);
  console.log(folder);

  if(document.getElementById(folderID) != null) {
    document.getElementById(folderID).classList.toggle("show");
  }
}

//Access bookmark object and remove the clicked one




// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function barScroll() {
  // Get the offset position of the navbar
  
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}


$(links).bind("contextmenu",function(e){
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
          displayBBBBEditBox();
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

  var newFolderButtonElement = document.getElementById("BBBBnewFolderButton");





  newFolderButtonElement.addEventListener("click", () => BBBBaddBookMarkFolder());


  if(document.getElementById('newFolderButton')) {
    document.getElementById('newFolderButton').addEventListener("click", () => addBookMarkFolder());

  }





  



   function doneButtonFunction(clickedId) {
    // Get Current Object Get Request
    let returnObj = sampleListObj;
    // Get Current Objecct
    // set up new object

    let newBookmark = {type : "Bookmark",
      obj : {
      link : "",
      name : ""
    }}

    var name = document.getElementById("fname").value;
    var link = "../HTML/";
    var id;
    test = document.getElementById(clickedId);
    test.src = "../image/FilledBookmark.png";
    id = test.id + 'id';
    var check = document.getElementById(id);

    


    
    if(name == "")
    {
      name = test.id;
    }
    if(check != null)
    {
      document.getElementById(id).innerText = name;
    }
    else
    {
      if(clickedId.includes('Assignment'))
      {
        if(clickedId.includes('SWE'))
        {
          link = link + 'assignmentexample.html';
        }
        else if(clickedId.includes('Alg'))
        {
          link = link + 'alg_assignment.html';
        }
        else if(clickedId.includes('OS'))
        {
          link = link + 'os_assignment.html';
        }
        else if(clickedId.includes('Data'))
        {
          link = link + 'databasehw.html';
        }
      }
      else
      {
        if(clickedId.includes('SWE'))
        {
          link = link + 'classexample.html';
        }
        else if(clickedId.includes('Alg'))
        {
          link = link + 'algorithms.html';
        }
        else if(clickedId.includes('OS'))
        {
          link = link + 'os.html';
        }
        else if(clickedId.includes('Data'))
        {
          link = link + 'DataClass.html';
        }
      }
      //$('#links').append('<a href=\"' + link +'\" class=\"item\" id=\"' + test.id + 'id\">' + name + '</a>\n');
      newBookmark.obj.name = name;
      newBookmark.obj.link = link;
      newBookmark.obj.id = test.id;

      



      sampleListObj.push(newBookmark);
      //Send Object Up e.g Post method

       addLinks(sampleListObj);

       updateFolderDisplay();

       removeBookMarkEventListener();
  
      setUpBookmarkBar();
    }
    div = document.getElementById('editBoxContainer');
    div.style.display = "none";
  }


function removeButtonFunction(clickedId) {
    //get object via get request
    newObject = sampleListObj;
    for(var i = 0; i < sampleListObj.length; i++) {
      if (sampleListObj[i].type == "Bookmark") {
        if (sampleListObj[i].obj.id == clickedId) {
          sampleListObj.splice(i, 1);
          break;
        }
      }
    }
    addLinks(sampleListObj);
    updateFolderDisplay();
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

    
  function displayBBBBEditBox() {

    div = document.getElementById('BBBBeditBoxContainer');
    if (div.style.display == 'block') {
      div.style.display = "none";
    }
    else {
      div.style.display = "block";

    }

  }



  //------------------------- Bookmark Bar Edit Box Listeners------------------------------


  let BookMarkId;

  function setUpBookmarkBar() {

    var BookmarkBarElements = document.getElementById("links"); //Im trying to get all the ids of current bookmarks

    var elements = BookmarkBarElements.getElementsByClassName('bookMarkItems');


    for(let j = 0; j < elements.length; j++) { 
      BookmarkId =  elements[j].id;
      elements[j].addEventListener("contextmenu", anson = saveBookMarkId.bind(elements[j], elements[j].id)); // Theres was an error here because the event listener is trying to find elements[j].id, which doesn't exist. I don't know how to remove event listener
      
      // console.log(elements[j]); 
      // console.log(elements[j].id);                                                           // I bs'ed it, anson is a reference to the Orignal function, so I am able to remove using removeEventListner. As Javascript does not like functions with parameters. (considered anomoyous function that cant be traced back)


    }    

  }

  function saveBookMarkId (input) {

    BookMarkId = input;

  }

  function setUpBBBBEditBox() {
    
    BBBBdoneButton.addEventListener("click", () => BBBBdoneButtonFunction(BookMarkId));
    BBBBremoveButton.addEventListener("click", () => BBBBremoveButtonFunction(BookMarkId));

  }


  function removeBookMarkEventListener() {
    var BookmarkBarElements = document.getElementById("links"); //Im trying to get all the ids of current bookmarks

    var elements = BookmarkBarElements.getElementsByClassName('bookMarkItems');

    

   

    for(let j = 0; j < elements.length; j++) {  
      elements[j].removeEventListener("contextmenu",  anson);
    }

  }

  
//-------------------------Bookmark Bar Edit Box Listeners------------------------------


  
async function BBBBremoveButtonFunction(BookMarkId) {
  var test = document.getElementById(BookMarkId);
//get object via get request
  newObject = sampleListObj;

  //console.log(test);


  removeBookMarkEventListener();

  test.remove();

 
  for(var i = 0; i < sampleListObj.length; i++) {
    if (sampleListObj[i].type == "Bookmark") {
      if (sampleListObj[i].obj.id == BookMarkId) {
        sampleListObj.splice(i, 1);
        break;
      }
      
    }
    else if (sampleListObj[i].type == "Folder") {
      if(sampleListObj[i].id == BookMarkId) {
        sampleListObj.splice(i, 1);
        break;
      }
      
      for(var j = 0; j < sampleListObj[i].obj.length; j++) {
        console.log(sampleListObj[i].obj[j].obj.id);
        if (sampleListObj[i].obj[j].obj.id == BookMarkId) {
          sampleListObj[i].obj.splice(j, 1);
          break;
        }

      }


    }

    
  }

  await addLinks(sampleListObj);

  updateFolderDisplay();

  console.log(sampleListObj);



  setUpBookmarkBar();


   //Send Object Up e.g Post method


  div = document.getElementById('BBBBeditBoxContainer');
  div.style.display = "none";
}


function BBBBdoneButtonFunction(BookMarkId) {
  console.log(BookMarkId);
  var bookmark = document.getElementById(BookMarkId);
  var nameBox = document.getElementById("bname");

  bookmark.innerHTML = nameBox.value;

  var found = findBookMark(BookMarkId);



  console.log(found);


  found.name = nameBox.value;


  if(bookmark.classList[0] == "bookmarkFolder") {


    updateFolderDisplay();

  }

  div = document.getElementById('BBBBeditBoxContainer');
  div.style.display = "none";

}


function findBookMark(BookMarkId) { 

    //get object via get request   // maybe you need this idk - Arthur

    newObject = sampleListObj;

    test = document.getElementById(BookMarkId);
    
    console.log(test.id);


    for(var i = 0; i < sampleListObj.length; i++ ) {
  

      if(sampleListObj[i].type == "Folder") {
        console.log(i);
        if(sampleListObj[i].id == BookMarkId ) {
          return sampleListObj[i];
        }
        for (var j = 0; j < sampleListObj[i].obj.length; j++) {
          if(sampleListObj[i].obj[j].obj.id == BookMarkId ) {
            console.log(sampleListObj[i].obj[j]);
            return sampleListObj[i].obj[j].obj;
          }
        }
      }

      // else if(sampleListObj.type == "Bookmark") {
      //   if(sampleListObj[i].obj.id == BookMarkId ) {
      //     return sampleListObj[i].obj;
      //   }
      // }
    } 
}

function BBBBaddBookMarkFolder() {
  //get object via get request

  newObject = sampleListObj;

  let newFolder = {type : "Folder",
    obj : {
    name : "",
    id :  "",
  }}

  var name = document.getElementById("bname").value;


  if(name == "")
  {
    name = "BookMarkFolder";
  }

  newFolder.name = name;
  newFolder.id = Math.floor(Math.random() * (1000 - 0) ) + 0;

  sampleListObj.push(newFolder);

  //Send Object Up e.g Post method

  addLinks(sampleListObj);

  updateFolderDisplay();

  if(sampleListObj.length != 1) {
  
    removeBookMarkEventListener();

  }


  setUpBookmarkBar();


  

  div = document.getElementById('BBBBeditBoxContainer');
  div.style.display = "none";



}


function addBookMarkFolder() {
  //get object via get request
  

  newObject = sampleListObj;

  let newFolder = {type : "Folder",
    obj : {
    name : "",
    id :  "",
  }}

  var name = document.getElementById("fname").value;


  if(name == "")
  {
    name = "BookMarkFolder";
  }

  newFolder.name = name;
  newFolder.id = Math.floor(Math.random() * (1000 - 0) ) + 0;

  sampleListObj.push(newFolder);

  //Send Object Up e.g Post method

  addLinks(sampleListObj);

  updateFolderDisplay();

    if(sampleListObj.length != 1) {
  
    removeBookMarkEventListener();

  }
 
  removeBookMarkEventListener();


  setUpBookmarkBar();

  div = document.getElementById('editBoxContainer');
  div.style.display = "none";
}

//var displayhtmlString  =  "<option value=\"BookMarkBar\">BookMarkBar</option>\n";


function updateFolderDisplay() {

    //get object via get request
  

    newObject = sampleListObj;

    var display = document.getElementsByClassName('BookMarkFolderView');

    // var bookMarkHTML = "<option value=\"BookMarkBar\">BookMarkBar</option>\n";
    

    console.log(display[0]);

    var htmlString = "<option value=\"BookMarkBar\">BookMarkBar</option>\n";


    for (let i = 0; i < sampleListObj.length; i++) {
      if (sampleListObj[i].type == "Folder") {
        htmlString = htmlString + "<option value=\"" + sampleListObj[i].id + "\">" + sampleListObj[i].name  +  "</option>\n";
      }
  }


  display[0].innerHTML = htmlString;

  if(document.getElementById('newFolderButton')) { // THis makes it that this line of code doesnt run in homepage
    display[1].innerHTML = htmlString;
  }

}








