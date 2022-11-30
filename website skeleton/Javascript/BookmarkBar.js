// BookmarkBar.js
// Class holds Main bookmarking bar list. It will hold all of the methods to add and delete bookmarks and folders on the bar
//What a sample subset of the data might look like

class BookmarkBar {
   bookmarkList;

   
   constuctor() {
    this.bookmarkList = Array();
   }

   // when recieving JSON object call function with listObj to build current list of bookmarks and folders
   addObj(listObj) {
      let tempList = [];

      for (var i = 0; i < listObj.length; i++) {

        console.log(listObj.obj);
        // if bookmark log bookmark into list, if folder log folder and all of its contents into list
        if (listObj[i].type == "Bookmark") {

            // stretched out for troubleshooting could be written as:
            // tempList.push(new BookmarkResource(new Bookmark(listObj[i].obj.link, listObj[i].obj.name),"Bookmark"));

            let obj1 = new Bookmark(listObj[i].obj.link, listObj[i].obj.name);

            let obj2 = new BookmarkResource(obj1,"Bookmark");

          tempList.push(obj2);

         } else if (listObj[i].type == "Folder") {
            let list = [];

            for (var j = 0; j < listObj[j].obj.length; j++) {

               list.push(
                  new Bookmark(
                     listObj[i].obj[j].link,
                     listObj[i].obj[j].name));
            }

            tempList.push(
               new BookmarkResource(
                  new BookmarkFolder(list),
                  "Folder"));
         }
      }
      this.bookmarkList = tempList;
   }

   //adds folder
   // untested
   addFolder(name) {
      let items = [];
      this.bookmarkList.push(new BookmarkResource(new BookmarkFolder(items, name), "Folder"));
   }

   // returns true or false depending on whether folder was found
   // untested
   addBookmarkToFolder(folderName, link, bookmarkName) {

      for (var i = 0; i < listObj.length; i++){

         if (this.listObj[i].obj.name == folderName) {

            this.listObj[i].obj.items.push( new Bookmark(link, bookmarkName));

            return true;

         }
      }
      return false;
   }


   getBarObj() {
      return this.bookmarkList;
   }

   // Chance we just grab the object and do the html on main page because it will be easier for drop down bar integration
   getHTML() {
      let html = "";
      //TODO: parse through object to output html for bookmark bar
   }


   removeBookmark(bookmarkName) {
      //TODO: parse through object finding bookmarkname and deleting it
   }


   // return list of folders
   getFolders() {
      let folderNameList = [];
      //TODO: parse through making list of folders and returning that list of names
   }

   removeFolder(folderName) {
      //TODO: Call removeBookmark a bunch of times
   }

   addBookmark(link, bookmarkName) {
      //TODO: add bookmark to list. Create bookmark object.
   }


}


class BookmarkResource {
   object;
   type;

   constuctor(obj, type) {
      this.object = obj;
      this.type = type;
   }

}


class BookmarkFolder {
   items;
   name;

   constuctor(items, name) {
      this.items = items;
      this.name = name
   }
}


class Bookmark {
   link;
   name;
   constructor(link, name) {
      this.link = link;
      this.name = name;
   }

}


export {BookmarkBar};