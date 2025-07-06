'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Employee
      Profession.hasMany(models.Employee, {
        foreignKey: 'profession_id',
        as: 'employees'
      });
    }
  }
  Profession.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profession',
  });
  return Profession;
};