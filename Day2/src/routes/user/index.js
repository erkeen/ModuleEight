const express = require("express");
const { basic, adminOnly } = require("../auth");
const UserSchema = require("./schema");

const userRouter = express.Router();

userRouter.get("/", basic, adminOnly, async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/me", basic, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log("ERROR HAPPENED");
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser = new UserSchema(req.body);
    const { _id } = await newUser.save();
    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
  }
});

userRouter.delete("/me", basic, async (req, res) => {
  try {
    await req.user.remove();
    res.send("DELETED");
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRouter;
