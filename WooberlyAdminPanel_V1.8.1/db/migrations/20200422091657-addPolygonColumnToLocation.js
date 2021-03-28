'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Location', 'geometryCoordinates', {
        type: Sequelize.GEOMETRY('POLYGON')
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Location', 'geometryCoordinates')
    ])
  }
};
