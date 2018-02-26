'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fb_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    }
  });

  User.associate = function(models) {
    User.hasMany(models.BeerInfo, {
      onDelete: "cascade"
    });
  };

return User;
};
