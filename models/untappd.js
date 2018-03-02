
'use strict';

module.exports = function(sequelize, DataTypes) {
  var Beers = sequelize.define("Beers", {

    beer_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2],
          msg: "Beer could not be saved as this entry is missing required data! Please choose another."
        }
      }
    },
    beer_desc: {
      type: DataTypes.STRING(510)
    },
    beer_abv: {
      type: DataTypes.INTEGER
    },
    beer_labelUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2],
          msg: "Beer could not be saved as this entry is missing required data! Please choose another."
        }
      }
    },
    brewery_name: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true
  });
  Beers.associate = function(models) {
    Beers.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

return Beers;
};
