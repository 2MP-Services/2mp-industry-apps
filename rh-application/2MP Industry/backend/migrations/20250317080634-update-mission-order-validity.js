'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the old 'validity' column
    await queryInterface.removeColumn('MissionOrders', 'validity');

    // Add the new 'validity_from' and 'validity_to' columns
    await queryInterface.addColumn('MissionOrders', 'validity_from', {
      type: Sequelize.DATE,
      allowNull: true, // Adjust as needed
    });

    await queryInterface.addColumn('MissionOrders', 'validity_to', {
      type: Sequelize.DATE,
      allowNull: true, // Adjust as needed
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes: remove 'validity_from' and 'validity_to', and restore 'validity'
    await queryInterface.removeColumn('MissionOrders', 'validity_from');
    await queryInterface.removeColumn('MissionOrders', 'validity_to');

    await queryInterface.addColumn('MissionOrders', 'validity', {
      type: Sequelize.DATE,
      allowNull: true, // Adjust as needed
    });
  }
};