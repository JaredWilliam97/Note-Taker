const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");

const app = express();
const PORT = 8080;

//routes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db", "db.json"));
});

app.post("/api/notes", (req, res) => {
  const dbJson = require("./db/db.json");

  console.log(dbJson);
  const dbObj = JSON.parse(dbJson);

  console.log(req.body);
  const newNote = req.body;

  dbJson.push(newNote);
  console.log("Updated:");
  console.log(dbJson);

  fs.writeFile("./db/db.json", JSON.stringify(dbJson), function (err) {
    if (err) throw err;
    console.log("Saved!");
    res.json(newNote);
  });
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
