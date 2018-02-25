module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unique_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

return User;
};
