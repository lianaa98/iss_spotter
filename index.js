const fetchMyIP = require('./iss').fetchMyIP;
const fetchCoordsByIP = require('./iss').fetchCoordsByIP;
const fetchISSFlyOverTimes = require('./iss').fetchISSFlyOverTimes;

let myIP;
let location;
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP: ", ip);
  myIP = ip;

  fetchCoordsByIP(myIP, (error, body) => {
    if (error) {
      console.log("Error when finding coordinates! Details: ", error);
      return;
    }
    location = body;
    console.log(body);

    fetchISSFlyOverTimes(location, (err, body) => {
      if(err){
        console.log(err);
        return;
      }
      console.log(body);
    })
    
  });
});
