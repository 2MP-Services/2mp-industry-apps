'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DechargeArgent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Employee
      DechargeArgent.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee'
      });

      // Define association with User (created_by)
      DechargeArgent.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'creator'
      });
    }
  }

  DechargeArgent.init({
    // Fields
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Employees',
        key: 'id'
      }
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    use_cni: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true // Default value set to false
    },
    somme_argent: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false
    },
    unite_argent: {
      type: DataTypes.TEXT, 
      allowNull: false
    },

    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false // Default value set to false
    },
    remis: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0 // Default value set to false
    },
    isRemis: {
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
    modelName: 'DechargeArgent',
    tableName: 'DechargeArgents', // Ensure the table name matches the database
  });

  return DechargeArgent;
};