'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("ALTER TABLE ContentPageDetails CONVERT TO CHARACTER SET utf8;")
   ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([])
  }
};
