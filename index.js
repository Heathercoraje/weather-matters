// import Unsplash from 'unsplash-js';
//
// const unsplash = new Unsplash({
//   applicationId: "54cf3ae44a3db6d5d98d23aee2f4d21848d0871c84b89e98b7a4b2c35713529e",
//   secret: "761285b28fe949e3e3e3d819110c7ba5c7b2bec880ae4fbdf7906eba61eb100c",
//   callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
// });
// button.addEventListener('click', upsplash )
// function upsplash() {
//   upsplash.search.photos("dogs",1)
//   .then(toJson).then(json => {
//     console.log('hello, I am here!');
//     console.log(json);
//   });
// }

(function() {
  var endpoint = 'https://fcc-weather-api.glitch.me/api/current?';
  var tempUnit = 'C';
  var currentUnit, currentDegree, currentDegreeCelsius;

  function getHour() {
    var time = new Date().toLocaleTimeString();
    document.getElementById('time').innerHTML = time;
  }
  getHour();
  var myTimer = setInterval(getHour, 1000);

  (function getLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Your browser does not support getLocation function');
    }
    var toggle = document.getElementById('tempUnit');
    toggle.addEventListener('click', function tempUnitChange () {
      var current = document.getElementById('avg');
      var currentDegree = current.innerHTML;
      currentUnit = document.getElementById('tempUnit').innerHTML;
      var newUnit = currentUnit == 'C' ? 'F' : 'C';
      document.getElementById('tempUnit').innerHTML = newUnit;
      if(newUnit == 'F') {
        currentDegree = Math.round(parseInt(currentDegree) * 9 / 5 + 32);
        current.innerHTML = currentDegree + String.fromCharCode(176);
      } else {
        current.innerHTML = currentDegreeCelsius;
      }
    });
  })();


  function showPosition (position) {
    var lat = 'lat=' + position.coords.latitude;
    var lon = 'lon=' + position.coords.longitude;
    var urlTarget = endpoint + lat +'&'+ lon;
    getWeather(urlTarget);
    console.log(urlTarget);
    }

  function getWeather(url) {
    fetch(url, {
      method: 'GET'
    }).then(function(response){
        return response.json();
      }).then(function(myJson){
        document.getElementById('location').innerHTML = `${myJson.name}, ${myJson.sys.country}`;
        document.getElementById('desc').innerHTML = myJson.weather[0].main;
        document.getElementById('icon').src = getIcon(myJson.weather)
        currentDegreeCelsius = Math.round(myJson.main.temp) + " " + String.fromCharCode(176);
        document.getElementById('avg').innerHTML = currentDegreeCelsius;
        document.getElementById('tempUnit').innerHTML = tempUnit;
      }).catch(function(error){
        console.log(error);
      })
  }
  function getIcon(weather) {
    var iconPath, iconValue;
    var iconArr = weather.filter(function(each){
      return (each.icon)
    })
    iconValue = iconArr[0].icon;
    iconPath = iconValue.includes('https')? iconValue: `http://openweathermap.org/img/w/${iconValue}.png`
    console.log(iconPath);
    return iconPath;
  }
})();
