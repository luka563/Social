const Blog = require('../models/Blog')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { findOne } = require('../models/Blog')
const { default: mongoose } = require('mongoose')

const getAllBlogs = async(req,res)=>{
    let blogs 
    try {        
       blogs = await Blog.find()
    } catch (error) {
        console.log(error)
    }
    if(!blogs)
    res.status(200).json({message:"Blocks not found"})

    res.status(200).json(blogs)
}
const createBlog = async(req,res)=>{
    const {title,description,image,userId} = req.body
        let user         
        try {
            user = await User.findOne({_id:userId})
        } catch (error) {
            return console.log(error)
        }
       
       if(!user)
       return res.status(400).json({message:"NO USER WITH ID"})
       
       const newBlog = new Blog({
        title,
        description,
        image,
        user        
       })
       try {
        const session =await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        user.blogs.push(newBlog)
        await user.save({session})
        await session.commitTransaction()
               
       } catch (error) {
         console.log(error)
         return res.status(400).json({message:error})
       }
       return res.status(200).json(newBlog)
    }
const updateBlog = async(req,res)=>{   
    const {title,description}=req.body
    const blogId = req.params.id
    let blog
    try {
         blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
         })
    } catch (error) {
        console.log(error)
    }
    if(!blog)
    return res.status(400).json({message:"NO BLOG WITH ID"})

    return res.status(200).json(blog)
}
const getSingleBlog = async(req,res)=>{
    let blog
    try {        
        blog = await Blog.findOne({_id:req.params.id})
    } catch (error) {
        return console.log(error)
    }
    if(!blog)
    return res.status(400).json({message:"NO BLOG WITH ID"})

    return res.status(200).json(blog)
}
const deleteSingleBlog = async (req,res)=>{
    try {        
        blog =await Blog.findByIdAndRemove(req.params.id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (error) {
        return res.status(400).json({message:"NO BLOG WITH ID"})
    }
    return res.status(200).json(blog)
}
const blogsOfUser = async (req,res)=>{
    let returnedBlogs
        try {
        returnedBlogs = await User.findById(req.params.id).populate('blogs')
        } catch (error) {
            return res.status(400).json({message:error})
        }
        if(!returnedBlogs)
        return res.status(400).json({message:"NO USER WITH ID"})

        return res.status(400).json({blogs:returnedBlogs.blogs})
}
module.exports = {
    getAllBlogs,
    createBlog,
    updateBlog,
    getSingleBlog,
    deleteSingleBlog,
    blogsOfUser
}