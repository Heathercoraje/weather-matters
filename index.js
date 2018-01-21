(function() {
  var endpoint = 'https://fcc-weather-api.glitch.me/api/current?';
  var tempUnit = 'C';
  var desc, currentUnit, currentDegree, currentDegreeCelsius;

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

  function imageSearch(desc) {
    console.log('Finally!');
    var endpoint = 'https://pixabay.com/api/?key=7774617-59d8f79c8ba93cdd897894e0e&q=';
    var target = `${desc}+weather&image_type=photo&min_width=2000&min_height=1200&pretty=true`
    fetch(endpoint+target, {
      method: 'GET'
    }).then(function(response){
      return response.json();
    }).then(function(myJson){
      console.log('load image T_T');
      var index = Math.floor(Math.random() * Math.floor(myJson.hits.length-1));
      var imageUrl = myJson.hits[index].webformatURL;
      console.log(imageUrl);
      document.body.style.backgroundImage = `url(${imageUrl})`;
    }).catch(function(error){
      console.log(error);
    });
  }



  function showPosition (position) {
    var lat = 'lat=' + position.coords.latitude;
    var lon = 'lon=' + position.coords.longitude;
    var urlTarget = endpoint + lat +'&'+ lon;
    getWeather(urlTarget);
  }

  function getWeather(url) {
    fetch(url, {
      method: 'GET'
    }).then(function(response){
      return response.json();
    }).then(function(myJson){
      document.getElementById('location').innerHTML = `${myJson.name}, ${myJson.sys.country}`;
      desc =  myJson.weather[0].main;
      document.getElementById('desc').innerHTML = desc;
      imageSearch(desc);
      document.getElementById('icon').src = getIcon(myJson.weather)
      currentDegreeCelsius = Math.round(myJson.main.temp) + " " + String.fromCharCode(176);
      document.getElementById('avg').innerHTML = currentDegreeCelsius;
      document.getElementById('tempUnit').innerHTML = tempUnit;
    }).catch(function(error){
      console.log(error);
    });

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
