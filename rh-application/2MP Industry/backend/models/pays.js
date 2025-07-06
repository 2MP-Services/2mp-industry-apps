'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pays extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Wilaya
      Pays.hasMany(models.Wilaya, {
        foreignKey: 'pays_id',
        as: 'wilayas'
      });
    }
  }
  Pays.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pays',
  });
  return Pays;
};