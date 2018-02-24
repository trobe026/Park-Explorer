var Sequelize = require("sequelize");
const Op = Sequelize.Op;
var favoritesDB = require('../models/favoritesDB.js');

module.exports = function(app) {

  app.get("/api/all", function(req, res) {
    favoritesDB.findAll({}).then(function(results) {
      res.json(results);
    });
  });

};
