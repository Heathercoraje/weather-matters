// fetch(url, {
//   method: 'GET'
// }).then(function(response) {
//   return response.json();
// }).then(function(result){
//     console.log(result);
//   }).catch(function(err){
//   console.log('there is error: ', error);
// });


var testUrl = 'https://api.github.com/users/heathercoraje/repos';

// https://www.sitepoint.com/html5-geolocation/
fetch(testUrl, {
  method: 'GET'
}).then(function(response) {
  var data = response.json();
  console.log(data)
}).catch(function(error){
  console.log('there is error: ', error);
});
