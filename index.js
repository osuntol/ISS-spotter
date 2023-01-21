const { request } = require('http');
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIp } = require('./iss');
const { flyover } = require('./iss')
const { fetchISSFlyOverTimes } = require('./iss')
const { nextISSTimesForMyLocation } = require('./iss');

let coords = {
  latitude: '32.715738',
  longitude: '-117.1610838'
}

flyover('32.715738', '-117.1610838', (error, data) => {
  console.log(data);
})


fetchISSFlyOverTimes(coords, (error, data) => {
  if (error) {
    return console.log(error);
  }
  return console.log(data);
})

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});

