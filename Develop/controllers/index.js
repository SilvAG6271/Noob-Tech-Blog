const router = require('express').Router();
const commentRoutes = require('./Comment');
const postRoutes = require('./Post');
const userRoutes = require('./User');

router.use('./comment', commentRoutes);
router.use('./post', postRoutes);
router.use('./user', userRoutes);






module.exports = { Comment, User, Post };
