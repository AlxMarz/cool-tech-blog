const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const userCheck = await User.findOne({
      where: { username: req.body.username }
    });
    if (!userCheck) {
      const newUser = await User.create(req.body)
      req.session.save(() => {
        req.session.userId = newUser.userId;
        req.session.loggedIn = true;
      });
      res.status(200);
    } else {
      res.json({ message: "That user exists!" });
    }
  } catch(err) {
    res.status(500).json(err);
  };
});

module.exports = router;