// use dotenv to hide sensitive data
const connection = require("./DBConnect.js");
const dotenv = require("dotenv");
dotenv.config();

// Update the database with the new data
function updateDb(data, time) {
  //TODO: Dont update if the car is not moving
  if (checkData(data)) {
    //TODO: Always true
    console.log("hi");
    return 200;
  }
  let query = `INSERT INTO ${process.env.TABLE} (car_id, tracked_at, x, y) VALUES ('${data.ID}','${time}','${data.X}','${data.Y}' );`;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    // console.log("result: ", results);
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
        // console.log("result:", results);
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
          if (res.x === data.X && res.y === data.Y) {
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      }
    });
  });
}

module.exports = { updateDb, GetData };
