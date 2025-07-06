'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commune extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Daira
      Commune.belongsTo(models.Daira, {
        foreignKey: 'daira_id',
        as: 'daira'
      });

      // Define association with MissionOrder (departure commune)
      Commune.hasMany(models.MissionOrder, {
        foreignKey: 'depart_commune_id',
        as: 'departing_missions'
      });

      // Define association with MissionDestinations (multiple destinations)
      /*Commune.belongsToMany(models.MissionOrder, {
        through: models.MissionDestination,
        foreignKey: 'commune_id',
        otherKey: 'mission_id',
        as: 'destination_missions'
      });*/
      Commune.hasMany(models.MissionDestination, {
        foreignKey: 'commune_id',
        as: 'destination_missions'
      });
    }
  }
  Commune.init({
    name: DataTypes.STRING,
    daira_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Commune',
  });
  return Commune;
};