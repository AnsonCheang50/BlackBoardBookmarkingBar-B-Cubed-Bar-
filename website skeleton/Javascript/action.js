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
window.onload = async function () { mainActivity() };
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
  var mainObject;

  if (localStorage.getItem("obj0type") == null) {
    console.log("Object not found creating new one!");
    putObj(sampleListObj);
    mainObject = getObj();
  } else {
    console.log("Object Found!");
    mainObject = getObj();
  }

  
  console.log(mainObject);

  await addLinks(mainObject);
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
      
      htmlString = htmlString + "<div class = \"aligneverything\">";
      htmlString = htmlString + "<div onclick=\"folderDropdown("+ bookmarks[i].id +")\" class=\"bookmarkFolder bookMarkItems\" id=\"" + "a" + bookmarks[i].id + "\">" + bookmarks[i].name + "</div>\n";
      htmlString = htmlString + "<div class=\"folderDDItem\" id=\"" + bookmarks[i].id + "\">\n";
      for (var j = 0; j < bookmarks[i].obj.length; j++) {
        htmlString = htmlString + "<a class=\"folderItem bookMarkItems\" id=\"" + bookmarks[i].obj[j].obj.id + "\" href=\"" +  bookmarks[i].obj[j].obj.link + "\">" + bookmarks[i].obj[j].obj.name + "</a>\n";
      }
      htmlString = htmlString + "</div>";
      htmlString = htmlString + "</div>";
    }

  }

  document.getElementById('links').innerHTML = htmlString;

  return;
}

function folderDropdown(folderID) {
  let folder = document.getElementById(folderID);

    document.getElementById(folderID).classList.toggle("show");
}

// function to put the bookmark bar object in the storage
function putObj(bookmarks) {

  //delete existing objects
  let k = 0;
  let p = 0;
  while (localStorage.getItem("obj" + k + "type") != null) {

    //if folder delete everything in folder
    if (localStorage.getItem("obj" + k + "type") == "Folder") {

      p = 0;
      while(localStorage.getItem("obj" + k + "nestedObj" + p + "type") != null) {
        localStorage.removeItem("obj" + k + "nestedObj" + p + "type");
        p++;
      }

    }
    // remove the item so that it returns null if we were to check for it
    localStorage.removeItem("obj" + k + "type");
    k++;
  }

  //put new items in
  for (var i = 0; i < bookmarks.length; i++) {

    if (bookmarks[i].type == "Bookmark") {
      
      localStorage.setItem("obj" + i + "type", "Bookmark");
      localStorage.setItem("obj" + i + "link", bookmarks[i].obj.link);
      localStorage.setItem("obj" + i + "name", bookmarks[i].obj.name);
      localStorage.setItem("obj" + i + "id", bookmarks[i].obj.id);


    } else if (bookmarks[i].type == "Folder") {
      localStorage.setItem("obj" + i + "type", "Folder");
      localStorage.setItem("obj" + i + "name", bookmarks[i].name);
      localStorage.setItem("obj" + i + "id", bookmarks[i].id);


      for (var j = 0; j < bookmarks[i].obj.length; j++) {

        localStorage.setItem("obj" + i + "nestedObj" + j + "type", "Bookmark");
        localStorage.setItem("obj" + i + "nestedObj" + j + "link", bookmarks[i].obj[j].obj.link);
        localStorage.setItem("obj" + i + "nestedObj" + j + "name", bookmarks[i].obj[j].obj.name);
        localStorage.setItem("obj" + i + "nestedObj" + j + "id", bookmarks[i].obj[j].obj.id);
      }
    }
  }
}

function getObj() {
  let newObject = []

  let k = 0;
  let p = 0;

  
  while (localStorage.getItem("obj" + k + "type") != null) {
    


    if (localStorage.getItem("obj" + k + "type") == "Folder") {

      //make new folder object
      let newFolder = {
        name : "",
        type : "Folder",
        id :  "",
          obj : []
      }



      newFolder.name = localStorage.getItem("obj" + k + "name");
      newFolder.id = localStorage.getItem("obj" + k + "id");


      p = 0;

      while(localStorage.getItem("obj" + k + "nestedObj" + p + "type") != null) {

        let newBookmark = {type : "Bookmark",
          obj : {
          link : "",
          name : "",
          id : ""
        }}


        newBookmark.obj.name = localStorage.getItem("obj" + k + "nestedObj" + p + "name");
        newBookmark.obj.link = localStorage.getItem("obj" + k + "nestedObj" + p + "link");
        newBookmark.obj.id = localStorage.getItem("obj" + k + "nestedObj" + p + "id");

        newFolder.obj.push(newBookmark);
        p++;
      }

      newObject.push(newFolder);

    } else if (localStorage.getItem("obj" + k + "type") == "Bookmark") {
      let newBookmark = {type : "Bookmark",
          obj : {
          link : "",
          name : "",
          id : ""
        }}

      newBookmark.obj.name = localStorage.getItem("obj" + k + "name");
      newBookmark.obj.id = localStorage.getItem("obj" + k + "id");
      newBookmark.obj.link = localStorage.getItem("obj" + k + "link");

      newObject.push(newBookmark);

    }

    k = k + 1;
  }

  return newObject;
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
    let returnObj = getObj();
    // Get Current Objecct
    // set up new object

    let newBookmark = {type : "Bookmark",
      obj : {
      link : "",
      name : "",
      id : ""
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





      var folderDirect = document.getElementsByClassName("BookMarkFolderView");

      console.log(folderDirect[1].value);


      if(folderDirect[1].value == "BookMarkBar") {
        returnObj.push(newBookmark);
      }

      else {  //Its a folder 
          var index = findBookMarkForFolderView(folderDirect[1].value);
          console.log(returnObj[3]);
          returnObj[index.key1].obj.push(newBookmark);
      }

      
      //Send Object Up e.g Post method

       addLinks(returnObj);
       putObj(returnObj);

       updateFolderDisplay();

       removeBookMarkEventListener();
  
      setUpBookmarkBar();
    }
    div = document.getElementById('editBoxContainer');
    div.style.display = "none";
  }


function removeButtonFunction(clickedId) {
    //get object via get request
    // for(var i = 0; i < sampleListObj.length; i++) {
    //   if (sampleListObj[i].type == "Bookmark") {
    //     if (sampleListObj[i].obj.id == clickedId) {
    //       sampleListObj.splice(i, 1);
    //       break;
    //     }
    //   }
    // }

    // console.log(clickedId);

    // sampleListObj[index.key1].obj.splice(index.key2, 1);



    var test = document.getElementById(clickedId);
    //get object via get request
      newObject = getObj();



      console.log(clickedId);
    
     
    
    
      removeBookMarkEventListener();

      console.log(test);
    
      test.remove();


    for(var i = 0; i < newObject.length; i++) {
      if (newObject[i].type == "Bookmark") {
        if (newObject[i].obj.id == clickedId) {
          newObject.splice(i, 1);
          break;
        }
        
      }
      else if (newObject[i].type == "Folder") {
        console.log(newObject[i].id);
  
        if("a" + newObject[i].id ==  clickedId) {
          newObject.splice(i, 1);
          break;
        }
        
        for(var j = 0; j < newObject[i].obj.length; j++) {
          console.log(newObject[i].obj[j].obj.id);
          if (newObject[i].obj[j].obj.id == clickedId) {
            newObject[i].obj.splice(j, 1);
            break;
          }
  
        }
  
  
      }
  
      
    }



    

    //var index = findBookMarkForFolderView(clickedId);
    //newObject[index.key1].obj.splice(index.key2, 1);


    addLinks(newObject);
    putObj(newObject);
    updateFolderDisplay();
    setUpBookmarkBar();
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

    

    if(elements.length != 1) {

      for(let j = 0; j < elements.length; j++) {  
        elements[j].removeEventListener("contextmenu",  anson);
      }
   }

  }

  
//-------------------------Bookmark Bar Edit Box Listeners------------------------------


  
async function BBBBremoveButtonFunction(BookMarkId) {
  var test = document.getElementById(BookMarkId);
//get object via get request
  newObject = getObj();

 


  removeBookMarkEventListener();

  test.remove();

 
  for(var i = 0; i < newObject.length; i++) {
    if (newObject[i].type == "Bookmark") {
      if (newObject[i].obj.id == BookMarkId) {
        newObject.splice(i, 1);
        break;
      }
      
    }
    else if (newObject[i].type == "Folder") {
      console.log(newObject[i].id);

      if("a" + newObject[i].id ==  BookMarkId) {
        newObject.splice(i, 1);
        break;
      }
      
      for(var j = 0; j < newObject[i].obj.length; j++) {
        console.log(newObject[i].obj[j].obj.id);
        if (newObject[i].obj[j].obj.id == BookMarkId) {
          newObject[i].obj.splice(j, 1);
          break;
        }

      }


    }

    
  }

  await addLinks(newObject);
  putObj(newObject);

  updateFolderDisplay();


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

    newObject = getObj();

    test = document.getElementById(BookMarkId);
    
    console.log(BookMarkId);


    for(var i = 0; i < newObject.length; i++ ) {
  

      if(newObject[i].type == "Folder") {
        console.log(newObject[i].id);
        if( "a" + newObject[i].id == BookMarkId ) {
          return newObject[i];
        }
        for (var j = 0; j < newObject[i].obj.length; j++) {
          if(newObject[i].obj[j].obj.id == BookMarkId ) {
            console.log(newObject[i].obj[j]);
            return newObject[i].obj[j].obj;
          }
        }
      }

      else if(newObject[i].type == "Bookmark") {
        if(newObject[i].obj.id == BookMarkId ) {
          return newObject[i].obj;
        }
      }
    } 
}


function findBookMarkForFolderView(BookMarkId) { //returns the index to find folder and bookmark in folder

  
  var pair = {
    key1: 0,
    key2: 0
  };

  //get object via get request   // maybe you need this idk - Arthur


  newObject = getObj();

  test = document.getElementById(BookMarkId);
  
  




  for(var i = 0; i < newObject.length; i++ ) {
    if(newObject[i].type == "Folder") {
      console.log(newObject[i].id);
      if(newObject[i].id == BookMarkId ) {
        pair.key1 = i;
        pair.key = 0;
        return  pair;
      }
      for (var j = 0; j < newObject[i].obj.length; j++) {
        if(newObject[i].obj[j].obj.id == BookMarkId ) {
          pair.key1 = i;
          pair.key2 = j;
          return pair;
        }
      }
    }

    else if(newObject[i].type == "Bookmark") {
      if(newObject[i].obj.id == BookMarkId ) {
        return newObject[i].obj;
      }
    }
  } 
}

function BBBBaddBookMarkFolder() {
  //get object via get request

  newObject = getObj();

  let newFolder = {
    name : "",
    type : "Folder",
    id :  "",
      obj : []
    }

  var name = document.getElementById("bname").value;


  if(name == "")
  {
    name = "BookMarkFolder";
  }

  newFolder.name = name;
  newFolder.id = Math.floor(Math.random() * (1000 - 0) ) + 0;

  newObject.push(newFolder);

  //Send Object Up e.g Post method

  addLinks(newObject);
  putObj(newObject);

  updateFolderDisplay();

  if(newObject.length != 1) {
  
    removeBookMarkEventListener();

  }


  setUpBookmarkBar();

  console.log(newObject);


  

  div = document.getElementById('BBBBeditBoxContainer');
  div.style.display = "none";



}


function addBookMarkFolder() {
  //get object via get request
  
  newObject = getObj();

  let newFolder = {
  name : "",
  type : "Folder",
  id :  "",
    obj : []
  }


  var name = document.getElementById("fname").value;


  if(name == "")
  {
    name = "BookMarkFolder";
  }

  newFolder.name = name;
  newFolder.id = Math.floor(Math.random() * (1000 - 0) ) + 0;

  newObject.push(newFolder);

  //Send Object Up e.g Post method

  addLinks(newObject);
  putObj(newObject);

  updateFolderDisplay();

    if(newObject.length != 1) {
  
    removeBookMarkEventListener();

  }
 


  setUpBookmarkBar();

  div = document.getElementById('editBoxContainer');
  div.style.display = "none";
}



function updateFolderDisplay() {

    //get object via get request
  

    newObject = getObj();

    var display = document.getElementsByClassName('BookMarkFolderView');

    

    console.log(display[0]);

    var htmlString = "<option value=\"BookMarkBar\">BookMarkBar</option>\n";


    for (let i = 0; i < newObject.length; i++) {
      if (newObject[i].type == "Folder") {
        htmlString = htmlString + "<option value=\"" + newObject[i].id + "\">" + newObject[i].name  +  "</option>\n";
      }
  }


  display[0].innerHTML = htmlString;

  if(document.getElementById('newFolderButton')) { // THis makes it that this line of code doesnt run in homepage
    display[1].innerHTML = htmlString;
  }

  }
