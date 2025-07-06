'use strict';

const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Initialize all models
const models = {
  Commune: require('./Commune')(sequelize, DataTypes),
  Daira: require('./Daira')(sequelize, DataTypes),
  Employee: require('./Employee')(sequelize, DataTypes),
  MissionDestination: require('./MissionDestination')(sequelize, DataTypes),
  MissionOrder: require('./MissionOrder')(sequelize, DataTypes),
  Profession: require('./profession')(sequelize, DataTypes),
  Role: require('./Role')(sequelize, DataTypes),
  User: require('./User')(sequelize, DataTypes),
  Transport: require('./transport')(sequelize, DataTypes),
  Wilaya: require('./Wilaya')(sequelize, DataTypes),
  Pays: require('./pays')(sequelize, DataTypes),
  ExitAuthorization: require('./exitauthorization')(sequelize, DataTypes),
  DechargeArgent: require('./dechargeargent')(sequelize, DataTypes),
  DocumentLegal: require('./documentlegal')(sequelize, DataTypes),
};

// Define associations
Object.values(models).forEach(model => {
    model.associate(models);
});
// Initialize all models
db.Commune= models.Commune
db.Daira= models.Daira
db.Employee= models.Employee
db.MissionDestination= models.MissionDestination
db.MissionOrder= models.MissionOrder
db.Profession= models.Profession
db.Role= models.Role
db.User= models.User
db.Transport= models.Transport
db.Wilaya= models.Wilaya
db.Pays= models.Pays
db.ExitAuthorization= models.ExitAuthorization
db.DechargeArgent = models.DechargeArgent
db.DocumentLegal= models.DocumentLegal

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
