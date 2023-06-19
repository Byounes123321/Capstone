// use dotenv to hide sensitive data
const connection = require("./DBConnect.js");
const dotenv = require("dotenv");
dotenv.config();

// Update the database with the new data
async function updateDb(data, time) {
  // Check if the data is already in the database
  if (data.ID == 0) {
    console.log("No car id found");
    return;
  }
  checkData(data)
    .then((result) => {
      if (result) {
        // If the vehicle does not move, do nothing
        console.log("Data matches");
      } else {
        // if the vehicle has moved, update the database
        let query = `INSERT INTO ${process.env.TABLE} (car_id, tracked_at, x, y) VALUES ('${data.ID}','${time}','${data.X}','${data.Y}' );`;
        connection.query(query, function (error, results, fields) {
          if (error) throw error;
          console.log("Data inserted");
          // console.log("result: ", results);
        });
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the promise execution
      console.error("An error occurred:", error);
    });
}
async function GetData() {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT t.car_id, t.tracked_at, t.x, t.y
      FROM ${process.env.TABLE} t
      INNER JOIN (
        SELECT car_id, MAX(tracked_at) AS max_tracked_at
        FROM ${process.env.TABLE}
        GROUP BY car_id
      ) m
      ON t.car_id = m.car_id AND t.tracked_at = m.max_tracked_at;`;

    connection.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        console.log("result:", results);
        resolve(results);
      }
    });
  });
}
async function checkData(data) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT t.car_id, t.x, t.y
      FROM ${process.env.TABLE} t
      INNER JOIN (
        SELECT car_id, MAX(tracked_at) AS max_tracked_at
        FROM ${process.env.TABLE}
        WHERE car_id = ${data.ID}
        GROUP BY car_id
      ) m
      ON t.car_id = m.car_id AND t.tracked_at = m.max_tracked_at;`;

    connection.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        // console.log("results:", results);
        if (results.length > 0) {
          const res = results[0];
          if (
            res.x < data.X + 5 &&
            res.x > data.X - 5 &&
            res.y < data.Y + 5 &&
            res.y > data.Y - 5
          ) {
            //TODO: Check if data is close to the same location because the image moves slightly
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      }
    });
  }).catch((error) => {
    console.error("An error occurred:", error);
  });
}

module.exports = { updateDb, GetData };
