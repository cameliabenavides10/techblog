const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');



router.post('/',  withAuth, async (req, res) => {
    console.log('HITROUTE');
 console.log("BODY:" + req.session.user_id);
try{
    console.log('try block');
    const commentsData = await Comment.create({
        body: req.body.comment,
        userId: req.session.user_id,
        postId: req.body.postId
    });
    console.log(commentsData);
    res.status(200).json(commentsData);
  
    }
    catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;