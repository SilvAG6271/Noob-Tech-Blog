const router = require('express').Router();
const  {Post, User} = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/singlePost/:id',  async (req, res) => {
//   console.log('Fetching data for ID:', req.params.id);
//     try {
//         const singleBlogPosts = await Post.findByPk(
//           req.params.id);

//           if (singleBlogPosts) {
//             res.render('singlePost', {
//               title: singleBlogPosts.title,
//               text: singleBlogPosts.text,
//               loggedIn: req.session.loggedIn,
//               username: req.session.username  })
//           }else{
//     res.status(404).send('Post not found.');
//     } 
//   }catch (err) {
//      res.status(500).json(err)
//   } 
//  });

router.post('/', async(req,res)=> {
  try{
    const user = await User.findOne({where: {id: req.session.user_id}});

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const newPost = {
      ...req.body, "user_id": req.session.user_id,
      username: user.username
    }
    const postData = await Post.create(newPost);

    res.status(200).json(postData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/posts/:id', async (req,res) => {
  try {
    const postId = req.params.id;
    const updatedTitle = req.body.title;
    const updatedText = req.body.text;

    //find post by ID and update its title and text
    const updatePost = await Post.update({
      title: updatedTitle,
      text: updatedText,
    },
    {where: {
      id: postId,
    },
  }
    );
    if (updatePost[0] === 1) {
      res.status(200).json({message: 'Post updated successfully'});
    } else {
      res.status(404).json({message: 'Post not found'});
    }
  } catch (err) {
   res.status(500).json(err);
  }
  });
  
  module.exports = router