//importing modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mysql = require("mysql");
const bodyParser = require("body-parser");

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

//Location data endpoint
let data;
app.post("/api/location", (req, res) => {
  data = req.body;
  console.log(data);
  updateDb(data);
  res.sendStatus(200);
});

//input db info

function updateDb(data) {
  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  //   let query = "SELECT * FROM people;";
  let query = `INSERT INTO people (name, favcolor) VALUES ('${data.name}','${data.favcolor}' );`;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log("result: ", results);
  });

  connection.end();
}
//test page
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
