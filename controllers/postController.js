const Post = require("../models/postModel")

// ! get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
    res.status(200).json({
      status: 'successful',
      results: posts.length,
      data: {
        posts
      }
    })
  } catch (e) {
    res.status(400).json({
      status: "failed"
    })
  }
}

// ! get one post
exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json({
      status: 'successful',
      data: {
        post
      }
    })
  } catch (e) {
    res.status(400).json({
      status: "failed"
    })
  }
}


// ! create post
exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body)
    res.status(200).json({
      status: 'successful',
      data: {
        post
      }
    })
  } catch (e) {
    res.status(400).json({
      status: "failed"
    })
  }
}

// ! update post
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'successful',
      data: {
        post
      }
    })
  } catch (e) {
    res.status(400).json({
      status: "failed"
    })
  }
}

// ! delete post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: 'successful',
    })
  } catch (e) {
    res.status(400).json({
      status: "failed"
    })
  }
}