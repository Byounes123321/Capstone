// use dotenv to hide sensitive data
const connection = require("./DBConnect.js");

// Update the database with the new data
function updateDb(data, time) {
  //TODO: Dont update if the car is not moving
  let query = `INSERT INTO testdata (car_id, tracked_at, x, y) VALUES ('${data.ID}','${time}','${data.X}','${data.Y}' );`;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log("result: ", results);
  });
}

module.exports = updateDb;
