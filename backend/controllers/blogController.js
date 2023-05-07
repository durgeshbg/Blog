const Blog = require('../models/blogModel');
const mongoose = require('mongoose');


// Get all blogs
const getBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({createdAt: -1});
    res.status(200).json(blogs);
}

// Get a blog
const getBlog = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid ID"});
    }
    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({error: "Blog doesn't exist"});
    }
    res.status(200).json(blog);
}

// Create a blog
const createBlog = async (req, res) => {
    const {title, subject, body, author} = req.body;
    try {
        const blog = await Blog.create({title, subject, body, author});
        res.status(200).json(blog);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

// Delete a blog
const deleteBlog = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid ID"})
    }
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
        return res.status(404).json({error: "Blog doesn't exist"});
    }
    res.status(200).json(blog);
}

// Update a blog
const updateBlog = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid ID"})
    }
    const blog = await Blog.findByIdAndUpdate(id, {
        ...req.body
    });
    if(!blog) {
        return res.status(404).json({error: "Blog doesn't exist"});
    }
    res.status(200).json(blog);
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog
}