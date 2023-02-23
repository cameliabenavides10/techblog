const router = require('express').Router();
const { Comment, User, Post } = require('../models');
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
    res.render('all-posts', { posts, logged_in: req.session.logged_in, userId: req.session.user_id });

// testing it without front end
    // res.json({ message: 'worked' });
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
          model: Comment,
         include: [User],     
           },
         
    ],
    
    });
   
 if (postData){
    const post = postData.get({ plain: true });
 
    res.render('individualPost', { post, logged_in: req.session.logged_in  });


 } else{
    res.status(404).end();
 }
  } catch (err) {
    res.status(500).json(err);
  }
});





// dashboard getting blogs user created 
router.get('/dashboard/:id', async (req, res) => {
  try {
   

    const postData = await Post.findAll({
      include: [User],
      order: [["createdAt", "DESC"]],
      where: {
       userId: req.session.user_id,
         },
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    console.log(postData);
    console.log(req.session.user_id);
    // Serialize data so the template can read it
    // const posts = postData.map((post) => post.get({ plain: true }));
    console.log("THIS IS POSTS:" + posts);
    // Pass serialized data and session flag into template
    res.render('dashboard', { posts, logged_in: req.session.logged_in, userId: req.session.user_id  });

// testing it without front end
    // res.json({ message: 'worked' });
  } catch (err) {
    res.status(500).json(err);
  }
});




// routing for a user to write a new blog on dashboard page 
router.get('/dashboard/new/:id', (req, res) => {
  res.render('newPost')
});






// getting a single blog on dashboard in order to edit it
// router.get('/dashboard/edit/:id',  async (req, res) => {
//   try{
// const postData = await Post.findByPk(req.params.id, {
//   include: [
//     User,
//     {
//       model: Comment,
//      include: [User],     
//        },
//   ],
// });
// if (postData){
// const posts = postData.get({ plain: true });

// // for insomnia without front end
// // res.json({ posts, message: 'You are now logged in!' });

// res.render('dashboardSinglePost', { posts, logged_in: req.session.logged_in  });
// }
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// });








router.delete('/dashboard/delete/:id', async (req, res) => {
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








router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});






// routing for a user to edit a post on dashboard page 
router.get('/dashboard/edit/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
      
        include: [
           User,
          {
            model: Comment,
           include: [User],     
             },
           
      ],
      
      });
     
   if (postData){
      const post = postData.get({ plain: true });

      res.render('editPost', { post, logged_in: req.session.logged_in  });


    } else{
       res.status(404).end();
    }
     } catch (err) {
       res.status(500).json(err);
     }
   });
















module.exports = router;