var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://developer.nps.gov/api/v1/campgrounds?%20=&api_key=FnU7EWa9B2RlDnwnu33mMpYJZuWYhXAbYfGxkFh8",
  "method": "GET",
  "headers": {
    "authorization": "Basic Og==",
    "cache-control": "no-cache",
    "postman-token": "509a7a9e-dd99-d214-70d9-793c94ad5033"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});