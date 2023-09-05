const router = require('express').Router();
const withAuth = require("../../utils/auth");
const { Comment, Post } = require('../../models');



router.post('/',  async (req, res) => {
  try{
    const newComment = {
    ...req.body, "user_id": req.session.user_id,
}
  const postComment = await Comment.create(newComment);
      res.status(200).json(postComment);
    } catch (err) {
      console.log(err);
    res.status(500).json(err)
  }
    });
      
  
      router.delete('/comment/:id', withAuth, async (req, res) => {
        try {
          const commentId = req.params.id;
          const deletePost = await Comment.destroy({ 
          where: {
              id: commentId,
              user_id: req.session.user_id
          }
        });
    
        if(deletePost === 0) {
            return res.status(404).json({message: 'Comment not found'});
        }
        res.status(200).json({ message: 'Comment deleted successfully'});
      } catch (err) {
        console.log(err);
      res.status(500).json(err)
    }
    });

    module.exports = router