'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    postId: { type: DataTypes.INTEGER, allowNull: false },
    comment: DataTypes.TEXT,
    userId: { type: DataTypes.INTEGER, allowNull: false },
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
    });

    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post',
    });
  };
  return Comment;
};