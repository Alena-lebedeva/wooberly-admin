'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("INSERT INTO HomePage (`title`, `name`, `value`, `createdAt`, `updatedAt`) VALUES ('Home Section Image 7','homeSectionImage7', '7', NOW(), NOW())"),
      queryInterface.sequelize.query("INSERT INTO HomePage (`title`, `name`, `value`, `createdAt`, `updatedAt`) VALUES ('Home Section Image 8','homeSectionImage8', '8', NOW(), NOW())"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};
