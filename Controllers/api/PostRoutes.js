const router = require('express').Router();
const  {Post, User} = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/homepageSingle/:id', withAuth,  async (req, res) => {
//   console.log('Fetching data for ID:', req.params.id);
//     try {
//         const homeBlogPosts = await Post.findByPk(
//           req.params.id);

//           if (homeBlogPosts) {
//             res.render('homepageSingle', {
//               title: homeBlogPosts.title,
//               text: homeBlogPosts.text,
//                 })
//           }else{
//     res.status(404).send('Post not found.');
//     } 
//   }catch (err) {
//      res.status(500).json(err)
//   } 
//  });

router.post('/', async(req,res)=> {
  try{
      const newPost = {
      ...req.body, "user_id": req.session.user_id,
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