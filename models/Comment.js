const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}
//doing sequelize info for comment data
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
   
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
