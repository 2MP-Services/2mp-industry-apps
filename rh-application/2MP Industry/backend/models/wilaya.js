'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wilaya extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Pays
      Wilaya.belongsTo(models.Pays, {
        foreignKey: 'pays_id',
        as: 'pays'
      });
      // Define association with Daira
      Wilaya.hasMany(models.Daira, {
        foreignKey: 'wilaya_id',
        as: 'dairas'
      });
    }
  }
  Wilaya.init({
    name: DataTypes.STRING,
    pays_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wilaya',
  });
  return Wilaya;
};