//importing modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mysql = require("mysql");
const bodyParser = require("body-parser");

//TODO:
//Determine the ids for each car
//Only save database data if the object moves
//Create config process
//Create front end API

//create express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8888;

//connect to database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "testdb",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//Location data endpoint
let data;
app.post("/api/location", (req, res) => {
  data = req.body;
  console.log(data);
  findCarId(data);
  const today = new Date();
  const time = formatDateTime(today);
  updateDb(data, time);
  res.sendStatus(200);
});

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

//Config
function Config(data) {
  switch (data) {
    case { X: 240, Y: 120 }:
      data.Id = 1;
  }
}
//find car id
// function findCarId(data) {
//   if (data is within 6 blocks){
//     same id
// }

//input db info

function updateDb(data, time) {
  //determine if the object has moved

  //   let query = "SELECT * FROM people;";
  let query = `INSERT INTO testdata (car_id, tracked_at, x, y) VALUES ('${data.ID}','${time}','${data.X}','${data.Y}' );`;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log("result: ", results);
  });
}
//test page
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
