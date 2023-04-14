const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) return callback(err, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {

  request(`http://ipwho.is/${ip}`, (err, response, body) => {
    if (err) return callback(err, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const info = JSON.parse(body);
    if (info.success === false) {
      callback(null, `Failed to grab coordinates: ${info.message}`);
      return;
    }
    const latitude = info.latitude;
    const longitude = info.longitude;
    return callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coordinates, callback) {

  request(`https://iss-flyover.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (err, response, body) => {
    if (err) return callback(err, nul);
    if(response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when finding ISS fly-over time. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const obj = JSON.parse(body);
    return callback(err, obj.response);
  })

};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};