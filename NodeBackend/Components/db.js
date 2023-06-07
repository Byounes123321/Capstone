// use dotenv to hide sensitive data
const connection = require("./DBConnect.js");

// Update the database with the new data
function updateDb(data, time) {
  //TODO: Dont update if the car is not moving
  if (checkData(data)) {
    return 200;
  }
  let query = `INSERT INTO testdata (car_id, tracked_at, x, y) VALUES ('${data.ID}','${time}','${data.X}','${data.Y}' );`;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log("result: ", results);
  });
}
async function GetData() {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT t.car_id, t.tracked_at, t.x, t.y
      FROM testdata t
      INNER JOIN (
        SELECT car_id, MAX(tracked_at) AS max_tracked_at
        FROM testdata
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
function checkData(data) {
  const query = `SELECT t.car_id, t.x, t.y
  FROM testdata t
  INNER JOIN (
    SELECT car_id, MAX(tracked_at) AS max_tracked_at
    FROM testdata
    WHERE car_id = ${data.ID}
    GROUP BY car_id
  ) m
  ON t.car_id = m.car_id AND t.tracked_at = m.max_tracked_at;`;
}
module.exports = { updateDb, GetData };
