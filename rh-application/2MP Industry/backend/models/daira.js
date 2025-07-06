'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Daira extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Wilaya
      Daira.belongsTo(models.Wilaya, {
        foreignKey: 'wilaya_id',
        as: 'wilaya'
      });

      // Define association with Commune
      Daira.hasMany(models.Commune, {
        foreignKey: 'daira_id',
        as: 'communes'
      });
    }
  }
  Daira.init({
    name: DataTypes.STRING,
    wilaya_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Daira',
  });
  return Daira;
};