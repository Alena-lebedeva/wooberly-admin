'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Vehicles', 'vehicleStatus', {
        type: Sequelize.DataTypes.ENUM('active','inactive'),
        defaultValue: "active",
        allowNull: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([

    ])
  }
};
