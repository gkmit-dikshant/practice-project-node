"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.UserAddress, {
        foreignKey: "user_id",
        sourceKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(254), unique: true, allowNull: false },
      contact: { type: DataTypes.STRING(10), min: 10, max: 10 },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    },
  );

  // User.beforeDestroy(async (User, options) => {
  //   await Model.UserAddress.destroy({
  //     where: {
  //       user_id: User.id,
  //     },
  //   });
  // });

  // User.addHook("beforeDestroy", (this) => {
  //   Model.UserAddress.
  // });

  return User;
};
