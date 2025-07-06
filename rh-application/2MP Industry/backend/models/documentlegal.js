'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocumentLegal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  DocumentLegal.init({
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    color: DataTypes.STRING,
    dashboard: {                
      type: DataTypes.BOOLEAN,
      defaultValue: true        
    },
  }, {
    sequelize,
    modelName: 'DocumentLegal',
  });
  return DocumentLegal;
};