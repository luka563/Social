const express = require('express')
const blogRouter = express.Router()
const {getAllBlogs,createBlog,updateBlog,getSingleBlog,deleteSingleBlog,blogsOfUser} = require('../controllers/blogController')

blogRouter.get('/',getAllBlogs)
blogRouter.post('/add',createBlog)
blogRouter.put('/update/:id',updateBlog)
blogRouter.get('/:id',getSingleBlog)
blogRouter.delete('/:id',deleteSingleBlog)
blogRouter.get('/user/:id',blogsOfUser)
module.exports = blogRouter