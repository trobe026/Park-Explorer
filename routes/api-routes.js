var Sequelize = require("sequelize");
var db = require("../models")
// var favoritesDB = require('./models/favoritesDB.js');

module.exports = function(app) {

  app.get("/api/all", function(req, res) {
    userDB.findAll({}).then(function(results) {
      res.json(results);
    });
  });



};
