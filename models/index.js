const User = require('./User');
const Comments = require('./Comments');
const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});


Post.hasMany(Comments, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Post, {
foreignKey: 'postId'
});


Comments.beongsTo(User, {
    foreignKey:'userId',
    onDelete: 'CASCADE'
});

User.hasMany(Comments, {
    foreignKey: 'userId',
})


module.exports = { User, Comments, Post };