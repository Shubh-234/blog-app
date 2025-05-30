const Blog = require('../models/Blog');
const User = require('../models/User');
const mongoose = require('mongoose');


const createBlog = async (req,res) => {
    try {
        const {title,content} = req.body;

        if(!title || !content){
            return res.status(400).json({
                success : false,
                message : "Please enter a title and a blog"
            });
        }

        const blogCheck = await Blog.findOne({
            title: title
        })

        if(blogCheck){
            return res.status(400).json({
                success : false,
                message: "Title should be unique"
            })
        }

        if(title.length <2 || title.length>100){
            return res.status(400).json({
                success : false,
                message : "Title size should be between 2 and 100 characters"
            });
        }

        if(content.length <10 || content.length>5000){
            return res.status(400).json({
                success : false,
                message : "Content size should be between 10 and 5000 characters"
            });
        }
        
        const newBlog = new Blog({
            title,
            content,
            author: req.user.userId
        });

        await newBlog.save();

        return res.status(201).json({
            success : true,
            message : "New blog created",
            newBlog
        })

    } catch (error) {
        console.log(`error while creating blog ${error}`);
        return res.status(500).json({
            success: true,
            message: "Internal server error"
        })
    }
}


const getBlogs = async (req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const skip = (page-1)*limit;


        const blogs = await Blog.find().
        sort({ createdAt: -1}).
        skip(skip).
        limit(limit).
        populate('author','name email');

        const totalBlogs = await Blog.countDocuments();

        return res.status(200).json({
            success : true,
            message : "Blogs fetched succesfully",
            currentPage: page,
            totalPages: Math.ceil(totalBlogs/limit),
            totalBlogs,
            blogs
        })

    } catch (error) {
        console.log(`Error occurred while fetchiing blogs`);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}


const getBlogById = async (req,res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                success: false,
                message: "Please provide which blog to retreive"
            })
        }
        const blog = await Blog.findById(id).populate("author", "email")

        if(!blog){
            return res.status(400).json({
                success : false,
                message : 'Blog does not exist'
            })
        }

        return res.status(200).json({
            success : true,
            message : "Blog fetched successfully",
            blog
        })


    } catch (error) {
        console.log(`Error in the get blog by id controller ${error}`);
        return res.status(500).json({
            success : false,
            message: "Internal server error"
        })
    }
}


const updateBlog = async (req,res) => {
    try {
        const id = req.params.id;
        const {title,content} = req.body;

        if(!id){
            return res.status(400).json({
                success : false,
                message : "Please select which blog to update"
            })
        }

        const blogToUpdate = await Blog.findById(id);

        if(!blogToUpdate){
            return res.status(400).json({
                success : false,
                message : "Blog does not exist"
            })
        }

        if(req.user.userId !== blogToUpdate.author.toString()){
            return res.status(401).json({
                success : false,
                message : "You are not the author of this blog, hence you do not have update access"
            })
        }

        if(!title && !content){
            return res.status(400).json({
                success : false,
                message : "Please provide fields to update}"
            })
        }

        const updatedSchema = {};

        if(title){
            updatedSchema.title = title
        }

        if(content){
            updatedSchema.content = content
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id,updatedSchema, {
            new : true,
            runValidators: true
        })

        return res.status(200).json({
            success : true,
            message : "Blog updated successfully",
            updatedBlog

        })

    } catch (error) {
        console.log(`Error in updating blog ${error}`);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

const deleteBlog = async (req,res) => {
    try {
        const id = req.params.id;

        if(!id){
            return res.status(400).json({
                success : false,
                message : "Please select which blog to be deleted"
            })
        }

        const blogToDelete = await Blog.findById(id);

        if(!blogToDelete){
            return res.status(400).json({
                success : false,
                message : "Blog does not exist"
            })
        }

        if(req.user.userId !== blogToDelete.author.toString()){
            return res.status(401).json({
                success : false,
                message : "You are not the author of this blog, hence you do not have delete access"
            })
        }
        
        await Blog.findByIdAndDelete(id);

        return res.status(200).json({
            success : true,
            message: "Blog deleted successfully"
        })
    } catch (error) {
        console.log(`${error}`);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}


const getBlogByAuthor = async (req,res) => {
    try {
        const authorId = req.params.id;
        if(authorId){
            return res.status(400).json({
                success : false,
                message : "no author provided"
            })
        }

        const blogs = await Blog.find({
            author: authorId
        })

        res.status(200).json({
            success: true,
            message : `Blogs associated with the user ${authorId}`,
            blogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message: "Internal server error"
        })
    }
}



module.exports = {createBlog,getBlogs,getBlogById,updateBlog,deleteBlog,getBlogByAuthor}
