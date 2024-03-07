// auth routes
import express from "express";
import passport from "../controllers/googleAuth.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";
import { userModel } from "../models/user.model.js";
const gauthRouter = express.Router();

gauthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

gauthRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

gauthRouter.get("/google/success", async (req, res) => {
  // console.log(req.user.displayName,req.user.emails[0],req.user.id);
  const userExists=await userModel.findOne({email:req.user.emails[0].value})
  if(userExists){
    return res.render("home", { useremail: req.user.emails[0].value, username: req.user.displayName });

  }
const newUser=new userModel({
  name:req.user.displayName,
  email:req.user.emails[0].value,
password:null,
googleId:req.user.id
});
await newUser.save();
// console.log(req.user)
    res.render("home", { useremail: req.user.emails[0].value, username: req.user.displayName });

});

gauthRouter.get("/google/failure", (req, res) => {
  res.render("login", { errMsg: "User could not be logged in" });
});

export default gauthRouter;
