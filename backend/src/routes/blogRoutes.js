const express = require('express');
const router = express.Router();
const {validateToken} = require('../middlewares/authenticate')
const {createBlog,getBlogs,getBlogById,updateBlog,deleteBlog,getBlogByAuthor} = require('../controllers/blogController')

//middlewares

router.post('/create',validateToken,createBlog);

router.get('/view',getBlogs);
router.get('/view/:id',getBlogById);
router.get('/author/:id',getBlogByAuthor)

router.put('/update/:id',validateToken,updateBlog);

router.delete('/delete/:id',validateToken,deleteBlog);

module.exports = router;