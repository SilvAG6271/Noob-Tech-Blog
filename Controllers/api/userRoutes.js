const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

router.get('/username', async (req, res) => {
  if (req.session && req.session.username) {
    const userName = req.session.username;
    res.json({username: userName});
  } else {
    res.status(401).json({message: 'Unauthorized'});
  }
});

router.post('/', async (req, res)=> {
  try {
    const userInfo = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
    req.session.user_id = userInfo.id;
    req.session.loggedIn = true;
    req.session.username = userInfo.username;
    
    res.status(200).json(userInfo);
   });  
  }catch (err){
    res.status(500).json(err);
  }
})

router.post('/login', async(req, res) => {
try {
  const userInfo = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!userInfo) {
    res.status(400).json({message:'Incorrect username or password. Please try again!'});
    return;
  }
  const validPassword = await userInfo.checkPassword(req.body.password);
  if (!validPassword) {
    res.status(400).json({message: 'Incorrect email or password. Please try again!'});
    return
  }
  req.session.save(() => {
    req.session.user_id = userInfo.id;
    req.session.loggedIn = true;
    req.session.username = userInfo.username;
    res.status(200).json({user: userInfo, message: 'You have successfully logged in!',
    alert: 'Welcome back, user!'});
  });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
