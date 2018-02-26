var db = require("../models");

module.exports = function(app) {
  app.get("/api/all", function(req, res) {

  });

  app.post("/api/newBeer", function(req, res) {
    db.BeerInfo.create({
      beer_name: req.body.beer_name,
      beer_desc: req.body.beer_desc,
      beer_abv: req.body.beer_abv,
      beer_labelUrl: req.body.beer_labelUrl,
      brewery_name: req.body.brewery_name
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
