'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Comments',
      [
        {
          userId: 1,
          postId: 2,
          comment: 'I am a comment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          postId: 1,
          comment: 'I am another comment',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
