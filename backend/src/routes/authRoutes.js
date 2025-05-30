const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {validateToken} = require('../middlewares/authenticate')

const {signupUser,loginUser} = require('../controllers/authControllers')



router.post('/signup',signupUser);
router.post('/login',loginUser);
router.get('/me', validateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error in /auth/me:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});


module.exports = router;