const router = require('express').Router();
const { Comments, User, Post } = require('../../models');
// const withAuth = require('../utils/auth');

router.post('/', async (req, res) => {
try{
    const commentsData = await Comments.create({
        ...req.body,
        userId: req.session.userId,
        
    });
    res.status(200).json(commentsData);
    console.log(commentsData);
    }
catch (err) {
    res.status(400).json(err);
  }

});

module.exports = router;