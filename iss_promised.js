const request = require('request-promise-native');

// const { fetchMyNewIP } = require('./iss_promised');

function fetchMyNewIP() {
  return request('https://api.ipify.org?format=json')
}


function fetchCoordsByIP(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`)
}

function fetchISSFlyOverTimes(body){
  const {latitude, longitude} = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  return request(url);

}

function nextISSTimesForMyLocation (){
  return fetchMyNewIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } =JSON.parse(data);
      return response;
    })
}

module.exports = {
  fetchMyNewIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
}