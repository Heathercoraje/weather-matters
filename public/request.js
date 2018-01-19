fetch('https://api.github.com/users/heathercoraje/repos', {
  method: 'GET'
}).then(function(response) {
  return response.json();
}).then(function(result){
    console.log(result[5]);
  }).catch(function(err){
  console.log('there is error: ', error);
});



// https://www.sitepoint.com/html5-geolocation/
