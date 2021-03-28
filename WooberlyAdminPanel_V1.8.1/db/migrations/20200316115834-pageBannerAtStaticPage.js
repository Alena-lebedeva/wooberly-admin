'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('StaticPage', 'pageBanner', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('StaticPage', 'pageBanner')
   ])
  }
};
