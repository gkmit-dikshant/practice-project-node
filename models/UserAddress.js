"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
      });
    }
  }
  UserAddress.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      address_line: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      zip: {
        type: DataTypes.STRING(6),
        min: 6,
        max: 6,
        allowNull: false,
      },

      country: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserAddress",
      tablename: "user_addresses",
    },
  );
  return UserAddress;
};
