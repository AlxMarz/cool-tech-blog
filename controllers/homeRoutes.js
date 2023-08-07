const { Post, Comment, User } = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      raw: true,
      nest: true,
    });
    res.render("homepage", {
      userPosts,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {}
});

router.get("/dashboard", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.render("dashboard", {
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
      });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  res.render("login", {
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
  });
});

router.get("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } else {
    res.status(404).end();
  }
});

router.get("/signup", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  } else {
    res.render("signup", {
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  }
});

module.exports = router;