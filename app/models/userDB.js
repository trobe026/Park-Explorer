var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "User" model that matches up with DB
var User = sequelize.define("User", {
  // the routeName gets saved as a string
  // the name of the User (a string)
  first_name: Sequelize.STRING,
  // the User's role (a string)
  last_name: Sequelize.STRING,
  // and the User's force points (an int)
  unique_id: Sequelize.INTEGER
});

// Syncs with DB
User.sync();

// Makes the User Model available for other files (will also create a table)
module.exports = User;