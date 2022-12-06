const express = require("express");
const cors = require("cors");
const app = express();
 
app.use(
  cors({
    origin: "https://bookmarkdb.cloudant.com/bookmarks/c5926a8bdcc095a139c176dbea00b09d"
  })
);
 
app.get("/data", (req, res) => {
  bookmark.json({msg: 'This is CORS-enabled for all origins!'})
});
 
app.listen("https://bookmarkdb.cloudant.com/bookmarks/c5926a8bdcc095a139c176dbea00b09d");