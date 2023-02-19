const router = require('express').Router();
const { Comments, User, Post } = require('../../models');
// const withAuth = require('../utils/auth');

// creating a single new post 
router.post('/', async (req, res) => {
    const body = req.body;
    try {
        const postData = await Post.create({
            ...body,
            userId: req.sessionStore.userId,
        });
        res.status(200).json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// updating a single post
router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body,
            { 
                where: {
                id: req.params.id,
                },
            });
        res.status(200).json(postData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
            const postData = await Post.destroy({ 
                    where: {
                    id: req.params.id,
                    },
                });
                if (!postData) {
                    res.status(404).json({ message: 'No post found with this id!' });
                    return;
                  }
            res.status(200).json(postData);
    }
        catch (err) {
            res.status(500).json(err);
        }
    });




module.exports = router;