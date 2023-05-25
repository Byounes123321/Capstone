// format date time
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Beginning of config process

//TODO: Identify each car using a "Parking space"
function Config(data) {
  switch (data) {
    case { X: 240, Y: 120 }:
      data.Id = 1;
  }
}

// Find the id of the car post config
function findCarId(data) {
  // if (data is within 6 blocks){
  //   same id
}

module.exports = formatDateTime;
