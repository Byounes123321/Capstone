const connection = require("./DBConnect.js");
const dotenv = require("dotenv");
dotenv.config();

// format date time
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours() + 4).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Beginning of config process

//TODO: Identify each car using a "Parking space"
function Config(data) {
  switch (true) {
    case data.X >= 160 && data.X <= 280 && data.Y >= 25 && data.Y <= 65:
      data.ID = 1;
      break;
    // case JSON.stringify({ X: 480, Y: 240 }):
    //   data.ID = 2;
    //   break;
    // case JSON.stringify({ X: 360, Y: 480 }):
    //   data.ID = 3;
    //   break;
    // case JSON.stringify({ X: 120, Y: 360 }):
    //   data.ID = 4;
    //   break;
    // case JSON.stringify({ X: 240, Y: 480 }):
    //   data.ID = 5;
    //   break;
    // case JSON.stringify({ X: 480, Y: 360 }):
    //   data.ID = 6;
    //   break;
    // case JSON.stringify({ X: 360, Y: 120 }):
    //   data.ID = 7;
    //   break;
    // case JSON.stringify({ X: 120, Y: 240 }):
    //   data.ID = 8;
    //   break;
    default:
      data.ID = 0;
      break;
  }

  return data;
}

// Find the id of the car post config
async function findCarId(data) {
  return new Promise((resolve, reject) => {
    const query = `SELECT car_id FROM ${process.env.TABLE}
      WHERE x BETWEEN ${data.X - 20} AND ${data.X + 20}
      AND y BETWEEN ${data.Y - 20} AND ${data.Y + 20}
      LIMIT 1;`;

    connection.query(query, function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        console.log("result: ", results);
        resolve(results[0] ? results[0].car_id : null);
      }
    });
  });
}

module.exports = { findCarId, formatDateTime, Config };
