'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('StaticPage', [{
        pageName: 'Driver Privacy Policy',
        content: '<p></p>',
        metaTitle: 'Privacy Policy',
        metaDescription: 'Privacy Policy',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StaticPage', {
      pageName: {
        in: ['Driver Privacy Policy']
      }
    })
  }
};