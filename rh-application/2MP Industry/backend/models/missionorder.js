'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MissionOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Employee
      MissionOrder.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee'
      });

      // Define association with Commune (for departure commune)
      MissionOrder.belongsTo(models.Commune, {
        foreignKey: 'depart_commune_id',
        as: 'depart_commune'
      });

      // Define association with Transport
      MissionOrder.belongsTo(models.Transport, {
        foreignKey: 'transport_id',
        as: 'transport'
      });

      // Define association with User (created_by)
      MissionOrder.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'creator'
      });

      // Define association with MissionDestinations (multiple destinations)
      /*MissionOrder.belongsToMany(models.Commune, {
        through: models.MissionDestination,
        foreignKey: 'mission_id',
        otherKey: 'commune_id',
        as: 'destinations'
      });
      */
      MissionOrder.hasMany(models.MissionDestination, {
        foreignKey: 'mission_id',
        as: 'destinations'
      });
    }
  }
  MissionOrder.init({
    order_number: DataTypes.STRING,
    employee_id: DataTypes.INTEGER,
    depart_commune_id: DataTypes.INTEGER,
    transport_id: DataTypes.INTEGER,
    validity_from: DataTypes.DATE, 
    validity_to: DataTypes.DATE,  
    reason: DataTypes.TEXT,
    destination: DataTypes.TEXT,
    billet: DataTypes.TEXT,
    created_by: DataTypes.INTEGER,
    validated: {                
      type: DataTypes.BOOLEAN,
      defaultValue: true        
    },
    refuseReason: DataTypes.TEXT,
    refused: {                 
      type: DataTypes.BOOLEAN,
      defaultValue: false    
    },
    rapport: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'MissionOrder',
  });
  return MissionOrder;
};