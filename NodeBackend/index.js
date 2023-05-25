//import modules
const express = require("express");
const bodyParser = require("body-parser");

//import Database connection
const connection = require("./Components/DBConnect.js");

// Import Database functions
const updateDb = require("./Components/db.js");

// Import Utility functions
const formatDateTime = require("./Components/utils.js");

//TODO:
//Determine the ids for each car
//Only save database data if the object moves
//Create config process
//Create front end API

//create express app and define port
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8888;

//connect to database
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//Location data API endpoint for receiving data from the Pixy2 camera

//TODO: potentially add security to this endpoint
app.post("/api/location", (req, res) => {
  try {
    const data = req.body;
    // Log the data to the console
    console.log(data);
    // Find the car id
    // findCarId(data);
    // Create a timestamp for the data and update the database
    const today = new Date();
    const time = formatDateTime(today);
    updateDb(data, time);
    // Send a response to the client
    res.sendStatus(200);
  } catch (error) {
    console.error("An error occurred:", error);
    res.sendStatus(500);
  }
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
