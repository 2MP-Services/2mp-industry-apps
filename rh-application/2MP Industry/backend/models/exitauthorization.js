'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ExitAuthorization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Employee
      ExitAuthorization.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee'
      });

      // Define association with User (created_by)
      ExitAuthorization.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'creator'
      });
    }
  }

  ExitAuthorization.init({
    // Fields
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Employees',
        key: 'id'
      }
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sortie_date: {
      type: DataTypes.DATEONLY, // DATEONLY stores only the date (no time component)
      allowNull: false
    },
    sortie_time: {
      type: DataTypes.TIME, // TIME stores only the time
      allowNull: false
    },
    entree_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    entree_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false // Default value set to false
    },
    refuseReason: DataTypes.TEXT,
    refused: {                   // New field
      type: DataTypes.BOOLEAN,
      defaultValue: false           // Default value set to false
    }
  }, {
    sequelize,
    modelName: 'ExitAuthorization',
    tableName: 'ExitAuthorizations', // Ensure the table name matches the database
  });

  return ExitAuthorization;
};