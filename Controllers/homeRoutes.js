const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const latestPosts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
     });
    const formatPosts = latestPosts.map((post) => ({
      username: post.username,
      title: post.title,
      text: post.text,
      created_on: post.created_on
    }));
    console.log('Latest Posts', latestPosts);
    

    res.render('homepage', {
       posts: formatPosts
      
    });

} catch (err) {
    res.status(500).json(err);
}
});

router.get('/login', (req, res) => {
    try {
      res.render('login', {
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/signup', (req, res) => {
  try {
  res.render('signup', {
    loggedIn: req.session.loggedIn
  })
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {user_id: req.session.user_id}
    });
    const postDatas = dbPostData.map((post) => 
      post.get({plain: true})
    );
  res.render('dashboard', {
    postDatas,
    loggedIn: req.session.loggedIn,
    username: req.session.username
  });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newPost', withAuth, (req, res) => {
  try {
    res.render('newPost', {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/singlePost/:id', async (req, res) => {
  console.log('Fetching data for ID:', req.params.id);
    try {
        const singleBlogPosts = await Post.findByPk(
          req.params.id);
          if (singleBlogPosts) {
            res.render('singlePost', {
              title: singleBlogPosts.title,
              text: singleBlogPosts.text,
              loggedIn: req.session.logged_in,
              username: req.session.username  })
          }else{
    res.status(404).send('Post not found.');
    } 
  }catch (err) {
     res.status(500).json(err)
  } 
});



module.exports = router;


