var db = require("../models");

module.exports = function(app) {
  app.get("/api/all", function(req, res) {

  });
  app.post("/api/newUser", function(req, res) {
    db.Users.findOrCreate({
      where: {
        fb_id: req.body.fb_id.trim()
      },
      defaults: {
        fb_id: req.body.fb_id.trim(),
        full_name: req.body.full_name.trim()
        // full_name: req.body.full_name
      }
    });
    // .then(function(result) {
    //   var user = result[0],
    //     created = result[1];
    //
    //     if (created) {
    //       console.log("User already exists in database");
    //     }
    //     console.log("Created User...");
    // });
  });
  app.post("/api/newBeer", function(req, res) {
    db.BeerInfo.create({
      beer_name: req.body.beer_name,
      beer_desc: req.body.beer_desc,
      beer_abv: req.body.beer_abv,
      beer_labelUrl: req.body.beer_labelUrl,
      brewery_name: req.body.brewery_name,
      UserFbId: req.body.UserFbId
    });
  });

  app.post("/api/deleteBeer", function(req, res) {
    db.BeerInfo.destroy({
      where: {
        beer_desc: req.body.beer_desc
      }
    });
  });

};
