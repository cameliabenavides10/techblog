const router = require('express').Router();
const { Comments, User, Post } = require('../models');
// const withAuth = require('../utils/auth');
require('dotenv').config();


//  get all posts for the homepage
router.get('/', async (req, res) => {
  try {
   
    const postData = await Post.findAll({
      include: [User],
      order: [["createdAt", "DESC"]]
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    // res.render('all-posts', { posts });

// testing it without front end
    res.json({ message: 'worked' });
  } catch (err) {
    res.status(500).json(err);
  }
});





//  get one post 
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comments,
         include: [User],     
           },
      ],
    });
 if (postData){
    const posts = postData.get({ plain: true });

    res.render('single-post', { postData });


// checked it on insomnia without frontend 
    // res.json({ postData, message: 'You are now logged in!' });
 } else{
    res.status(404).end();
 }
  } catch (err) {
    res.status(500).json(err);
  }
});







router.get('/signup', async (req, res) => {

    if (req.session.logged_in) {
        res.redirect('/');
        return;
      }
    
      res.render('signup');
    });
    






router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;