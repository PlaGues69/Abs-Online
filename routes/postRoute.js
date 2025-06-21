// 📁 routes/postRoute.js
const express = require("express");
const Post = require("../models/PostModel");
const postRoutes = express.Router();

// ✅ Create a post
postRoutes.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
});

// ✅ Get all posts
postRoutes.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err.message });
  }
});

// ✅ Delete post by ID
postRoutes.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
});

// ✅ Update post by ID
postRoutes.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
});

module.exports = postRoutes;

