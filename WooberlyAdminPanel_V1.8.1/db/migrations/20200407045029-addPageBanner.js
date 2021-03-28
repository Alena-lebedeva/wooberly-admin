'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('ContentPageDetails', 'pageBanner', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ContentPageDetails', 'pageBanner', {
        type: Sequelize.STRING
      })
    ])
  }
};
