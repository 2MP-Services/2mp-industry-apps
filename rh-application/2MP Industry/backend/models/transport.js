'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with MissionOrder
      Transport.hasMany(models.MissionOrder, {
        foreignKey: 'transport_id',
        as: 'missions'
      });
    }
  }
  Transport.init({
    type: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    registration: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    purchase_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transport',
  });
  return Transport;
};