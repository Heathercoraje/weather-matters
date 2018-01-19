// get current location

(function getLocation () {
  if (navigator.geolocation){
    console.log('yes your browswer supports this function');
    navigator.geolocation.getCurrentPosition(showPosition);

  }
})();


function showPosition (position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  console.log(lat, long)
}
