'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Profession
      Employee.belongsTo(models.Profession, {
        foreignKey: 'profession_id',
        as: 'profession'
      });

      // Define association with MissionOrder
      Employee.hasMany(models.MissionOrder, {
        foreignKey: 'employee_id',
        as: 'mission_orders'
      });

      // Define association with Users
      Employee.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }

  Employee.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    profession_id: DataTypes.INTEGER,
    cin: DataTypes.STRING,
    hire_date: DataTypes.DATE,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allows the field to be null
      references: {
        model: 'Users', // References the Users table
        key: 'id'       // References the primary key of the Users table
      }
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true // Allows the field to be null
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });

  return Employee;
};