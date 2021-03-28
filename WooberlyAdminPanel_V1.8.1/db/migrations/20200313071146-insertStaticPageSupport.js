'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('StaticPage', [{
        pageName: 'Support',
        content: '<p></p>',
        metaTitle: 'Support',
        metaDescription: 'Support',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StaticPage', {
      pageName: {
        in: ['Support']
      }
    })
  }
};