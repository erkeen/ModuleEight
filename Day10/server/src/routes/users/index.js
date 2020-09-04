const router = require("express").Router();
const { authenticate, refreshToken } = require("./authTools");
const { authorize } = require("../middlewares/authorize");

const UserModel = require("./model");

router.post("/register", async (req, res, next) => {
  try {
    const user = new UserModel(req.body);
    const { _id } = await user.save();
    res.send(_id);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByCredentials(email, password);
    const tokens = await authenticate(user);
    res.send(tokens);
  } catch (error) {
    next(error);
  }
});

router.post("/refreshToken", async (req, res, next) => {
  const oldRefreshToken = req.body.refreshToken;
  if (!oldRefreshToken) {
    const err = new Error("Forbidden");
    err.httpStatusCode = 403;
    next(err);
  } else {
    try {
      const newTokens = await refreshToken(oldRefreshToken);
      res.send(newTokens);
    } catch (error) {
      console.log(error);
      const err = new Error(error);
      err.httpStatusCode = 403;
      next(err);
    }
  }
});

module.exports = router;
