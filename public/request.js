function request(url) {
   fetch(url, {
    method: 'GET'
   }).then(function(response) {   // returning a resoloved promise
    return response.json();
   }).then(function(myJson){
    var info = myJson;
    console.log(info);
    return info;
    }).catch(function(error) {
    console.log(error);
  });
}
