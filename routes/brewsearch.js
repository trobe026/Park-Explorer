// var db = require('../models');
//
// module.exports = function (app) {
//
//   // uses the node-untappd module
//   var UntappdClient = require("node-untappd");
//   var debug = false;
//   var untappd = new UntappdClient(debug);
//   var breweries = [];
//   var clientId = process.env.UNTAPPD_API_CLIENT_ID;
//   var clientSecret = process.env.UNTAPPD_API_CLIENT_SECRET;
//   ;
//
//   untappd.setClientId(clientId);
//   untappd.setClientSecret(clientSecret);
//
//   var BrewerySearch = function (lookUpBrewery) {
//     console.log(lookUpBrewery);
//   };
//
//   // when the page loads, look for nearby breweries
//   app.post("/api/makeLocalMap", function (req, res) {
//     console.log(req.body.position);
//   });
//
//   // use untappd to find a brewery
//   app.post("/", function (req, res) {
//     console.log(req.body.brewerySearch);
//     BrewerySearch(req.body.brewerySearch);
//     untappd.brewerySearch(function (err, obj) {
//       res.send(obj);
//       console.log(obj);
//       console.log('test')
//     }, {
//         q: req.body.brewerySearch
//       });
//   });
// };
