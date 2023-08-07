const router = require("express").Router();
const { Post } = require("../../models");



router.post("/post", async (req, res) => {
  try {
    const newPost = Post.create(req.body);
    console.log(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;