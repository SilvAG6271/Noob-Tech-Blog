const router = require('express').Router();
const { Blog, Post } = require('../models');

// GET all Posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
          },
          
      ],
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('homepage', {
      blogs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
router.get('/blog/:id', async (req, res) => {
  try {
    const dbBlogData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Blog,
          attributes: [
            'id',
            'title',
            'author',
            'created_on',
            // 'description',
          ],
        },
      ],
    });

    const blog = dbBlogData.get({ plain: true });
    res.render('blog', { blog });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one painting
router.get('/post/:id', async (req, res) => {
  try {
    const dbPaintingData = await Post.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });

    res.render('', {  });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
