
(function() {
  function getHour() {
    var time = new Date().toLocaleTimeString();
    document.getElementById('time').innerHTML = time;
  }
  getHour();
  var myTimer = setInterval(getHour, 1000);

  var endpoint = 'https://fcc-weather-api.glitch.me/api/current?';
  (function getLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Your browser does not support getLocation function');
    }
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
        document.getElementById('min').innerHTML = myJson.main.temp_min + 'C';
        document.getElementById('avg').innerHTML = myJson.main.temp + 'C';
        document.getElementById('max').innerHTML = myJson.main.temp_max + 'C';
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
