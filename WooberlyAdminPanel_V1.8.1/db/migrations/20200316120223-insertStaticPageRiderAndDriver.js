'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('StaticPage', [{
        pageName: 'Rider',
        content: '<p></p>',
        metaTitle: 'Rider',
        metaDescription: 'Rider',
        pageBanner: 'Rider',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticPage', [{
        pageName: 'Driver',
        content: '<p></p>',
        metaTitle: 'Driver',
        metaDescription: 'Driver',
        pageBanner: 'Driver',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StaticPage', {
      pageName: {
        in: ['Rider', 'Driver']
      }
    })
  }
};