const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');
//one to many relationship
User.hasMany(Post, {
    foreignKey: "user_id",
    });
//one to many relationship
User.hasMany(Comment, {
    foreignKey: "user_id"});
//one to one relationship
Post.belongsTo(User, {
    foreignKey: "user_id",
});
//one to many relationship
Post.hasMany(Comment,{
    foreignKey: "post_id"
});
//one to one relationship
Comment.belongsTo(User, 
    {foreignKey: "user_id"
});
//one to one relationship
Comment.belongsTo(Post, {
    foreignKey: "post_id"
});




module.exports = { Comment, User, Post };
