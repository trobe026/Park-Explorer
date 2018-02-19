var Sequelize = require("sequelize");
const Op = Sequelize.Op;
var History = require('../models/history.js');

module.exports = function(app) {

  app.get("/api/all", function(req, res) {
    History.findAll({}).then(function(results) {
      res.json(results);
    });
  });

};
