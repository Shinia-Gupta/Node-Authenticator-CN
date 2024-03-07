// auth routes
import express from "express";
import passport from "../controllers/githubAuth.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";
import { userModel } from "../models/user.model.js";
const hauthRouter = express.Router();

hauthRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["email", "profile"] })
);

hauthRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/hauth/github/success",
    failureRedirect: "/hauth/github/failure",
  })
);

hauthRouter.get("/github/success", async (req, res) => {
  // console.log(req.user);
  const userExists = await userModel.findOne({ githubId: req.user.id });
  if (userExists) {
    return res.render("home", {
      useremail: "email@example.com",
      username: req.user.username,
    });
  }
  const newUser = new userModel({
    name: req.user.username,
    email: "NA@example.com",
    password: null,
    githubId: req.user.id,
  });
  await newUser.save();
  // console.log(req.user)
  res.render("home", {
    useremail: "email@example.com",
    username: req.user.username,
  });
});

hauthRouter.get("/github/failure", (req, res) => {
  res.render("login", { errMsg: "User could not be logged in" });
});

export default hauthRouter;
