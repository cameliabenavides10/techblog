const router = require('express').Router();

const commentsRoutes = require('./commentsRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');

router.use('/comments', commentsRoutes);
router.use('/post', postRoutes);
router.use('/user', userRoutes);

module.exports = router;
