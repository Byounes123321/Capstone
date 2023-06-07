//import modules
const express = require("express");
const bodyParser = require("body-parser");

//import Database connection
const connection = require("./Components/DBConnect.js");

// Import Database functions
const { GetData, updateDb } = require("./Components/db.js");

// Import Utility functions
const { formatDateTime, findCarId, Config } = require("./Components/utils.js");

//TODO:
//Determine the ids for each car
//Create config process

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
app.post("/api/CamData", async (req, res) => {
  try {
    //Get JSON data from camera
    let data = req.body;
    // Log the data to the console
    console.log("data1:", data);
    // Find the car id
    try {
      //Get the car id by finding the last location closet to the current location
      const carId = await findCarId(data);
      console.log("Car ID:", carId);
      if (carId == null) {
        data = Config(data);
      } else {
        data.ID = carId;
      }
      // Continue with further processing if needed
    } catch (error) {
      // Handle any errors that occurred during the promise execution
      console.error("An error occurred:", error);
    }
    console.log("data2:", data);
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
app.get("/api/location", async (req, res) => {
  try {
    //get the location data from the database
    const data = await GetData();
    //send the data to the client
    console.log("data:", data);
    res.send(data);
  } catch (error) {
    console.log("An error occurred:", error);
    res.sendStatus(500);
  }
});
app.get("/", (req, res) => {
  res.send("Hello World");
});
//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
//Whats up
