const express = require('express');

const router = express.Router();

//middlewares

router.post('/signup',signupUser);
router.post('/login',loginUser);

module.exports = router;