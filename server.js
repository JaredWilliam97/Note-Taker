const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");
const { parse } = require("path");
const { notStrictEqual } = require("assert");

const app = express();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db", "db.json"));
});

app.post("/api/notes", (req, res) => {
  const dbJson = require("./db/db.json");
  console.log(dbJson);
  // const dbObj = JSON.parse(dbJson);

  const newNote = req.body;
  newNote.id = dbJson.length > 0 ? dbJson[dbJson.length - 1].id + 1 : 1;
  console.log(newNote);
  dbJson.push(newNote);
  console.log(dbJson);
  fs.writeFile("./db/db.json", JSON.stringify(dbJson), function (err) {
    if (err) throw err;
    console.log("Saved!");
    res.json(newNote);
  });
});
app.delete("/api/notes/:id", (req, res) => {
  // i want to delete the notes i create in the array

  // create the id waht is the next step???
  const id = req.params.id;
  console.log(typeof id);
  //delete each note when clicked on
  const dbJson = require("./db/db.json");
  ////// we need to find the note
  index = dbJson.findIndex((note) => note.id === parseInt(id));
  console.log(index);
  dbJson.splice(index, 1);

  res.end();
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", (req, res) => {
  const url = req.url === "/" ? "/index.html" : req.url;
  res.sendFile(path.join(__dirname, `/public${url}`));
});

//listening on the port
app.listen(PORT, () => {
  console.log(`Note Taker App listening on PORT ${PORT}`);
});
