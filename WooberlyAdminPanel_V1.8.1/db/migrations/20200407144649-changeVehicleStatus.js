'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Vehicles', 'vehicleStatus', {
        type: Sequelize.DataTypes.ENUM('pending','active','inactive'),
        defaultValue: "pending",
        allowNull: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([

    ])
  }
};
