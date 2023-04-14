const fetchMyIP = require('./iss_promised').fetchMyIP;
const fetchCoordsByIP = require('./iss_promised').fetchCoordsByIP;
const fetchISSFlyOverTimes = require('./iss_promised').fetchISSFlyOverTimes;

let ip;
let coordinates = {};

fetchMyIP()
  .then(body => {
    ip = JSON.parse(body).ip;
    return fetchCoordsByIP(ip);
  })
  .then(body => {
    let latitude = JSON.parse(body).latitude;
    let longitude = JSON.parse(body).longitude;
    coordinates.latitude = latitude;
    coordinates.longitude = longitude;
    return fetchISSFlyOverTimes(coordinates);
  })
  .then(body => {
    const obj = JSON.parse(body);
    for (let i of obj.response) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(i.risetime);
      console.log(`Next pass at ${datetime.toLocaleString()} for ${i.duration} seconds!`);
    }
  })
  .catch(error => console.log(error));
