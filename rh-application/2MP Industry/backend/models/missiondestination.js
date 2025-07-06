'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MissionDestination extends Model {
    static associate(models) {
      // Define association with MissionOrder
      MissionDestination.belongsTo(models.MissionOrder, {
        foreignKey: 'mission_id',
        as: 'mission'
      });

      // Define association with Commune
      MissionDestination.belongsTo(models.Commune, {
        foreignKey: 'commune_id',
        as: 'commune'
      });
    }
  }
  MissionDestination.init({
    mission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true // Part of the composite primary key
    },
    commune_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true // Part of the composite primary key
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true, // Part of the composite primary key
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'MissionDestination',
    timestamps: false // Disable automatic timestamps if not needed
  });
  return MissionDestination;
};