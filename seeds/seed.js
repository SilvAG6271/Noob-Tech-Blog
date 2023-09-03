const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');
const commentSeed = require("./commentSeed.json");
const userSeed = require('./userSeed.json');
const postSeed = require('./postSeed.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeed, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postSeed) {
    await Post.create({
        ...post
    });
  }

  for (const comment of commentSeed) {
    await Comment.create({
        ...comment
    });
  }

 
  process.exit(0);
};

seedDatabase();
