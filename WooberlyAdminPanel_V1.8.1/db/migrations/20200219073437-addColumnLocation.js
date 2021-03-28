'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
 queryInterface.addColumn('UserProfile', 'cardLastFour', {
        type: Sequelize.INTEGER
      }),
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   
  return Promise.all([
    queryInterface.addColumn('Location', 'isActive', {
      type: Sequelize.BOOLEAN,
      defaultValue: 1
    }),
    queryInterface.addColumn('Location', 'description', {
      type: Sequelize.STRING,
      defaultValue: 1
    })
  ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return Promise.all([
      queryInterface.removeColumn('Location', 'description'),
      queryInterface.removeColumn('Location', 'isActive')
   ])
  }
};
