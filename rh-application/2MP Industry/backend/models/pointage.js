// models/Pointage.js
module.exports = (sequelize, DataTypes) => {
    const Pointage = sequelize.define('Pointage', {
      check_in_time: DataTypes.DATE,
      check_out_time: DataTypes.DATE,
      check_in_ip: {
        type: DataTypes.STRING,
        allowNull: false
      },
      check_out_ip: {
        type: DataTypes.STRING,
        allowNull: true
      },
      check_in_mac: {
        type: DataTypes.STRING,
        allowNull: true
      },
      check_out_mac: {
        type: DataTypes.STRING,
        allowNull: true
      },
      date: DataTypes.DATEONLY
    }, {
      sequelize,
      modelName: 'Pointage',
      indexes: [
        {
          unique: true,
          fields: ['employee_id', 'date']
        }
      ]
    });
  
    Pointage.associate = (models) => {
      Pointage.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee'
      });
    };
  
    return Pointage;
  };