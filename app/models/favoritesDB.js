var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "User" model that matches up with DB
var User = sequelize.define("User", {
  // the User's last name (a string)
  first_name: Sequelize.STRING,
  // the User's last name (a string)
  last_name: Sequelize.STRING,
  // and the User's unique ID
  unique_id: Sequelize.INTEGER
});

// Syncs with DB
User.sync();

// Makes the User Model available for other files (will also create a table)
module.exports = User;