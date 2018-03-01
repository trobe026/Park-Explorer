var db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/untappd", function(req, res) {
    res.render("untappd");
  });

  app.get("/favorites", function(req, res){
    res.render("favorites")
  })
};
