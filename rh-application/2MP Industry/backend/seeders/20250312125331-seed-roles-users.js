'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insérer les rôles
    await queryInterface.bulkInsert('Roles', [
      { name: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'user', createdAt: new Date(), updatedAt: new Date() }
    ]);

    // Hacher le mot de passe de l'admin
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('test123', 10);

    // Insérer l'utilisateur admin
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password_hash: hashedPassword,
        role_id: 1, // Correspond au rôle "admin"
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  }
};