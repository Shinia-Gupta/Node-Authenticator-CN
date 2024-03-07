import express from "express";
import { BasicController } from "../controllers/basic.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";
// import jwtAuth from "../middlewares/jwtAuth.middleware.js";
const basicController = new BasicController();
const basicRouter = express.Router();

basicRouter.get("/", basicController.getRegister);
basicRouter.post("/", basicController.registerUser);
basicRouter.get("/login", basicController.getLogin);
basicRouter.post("/login", basicController.loginUser);
basicRouter.get("/logout", basicController.logout); 

basicRouter.post("/forgot-password", basicController.getOtpCheckerPage);
basicRouter.get("/forgot-password-get-email", basicController.getOtpEmail);
basicRouter.get("/new-password/:email", basicController.getchangePassword);
basicRouter.get("/new-password", basicController.getresetPassword);
basicRouter.post("/update-password", basicController.resetPassword);

basicRouter.post("/update-password/:email", basicController.changePassword);
basicRouter.get("/home", isAuth, basicController.getHome);

export default basicRouter;
