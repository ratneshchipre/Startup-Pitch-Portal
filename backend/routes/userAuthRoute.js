import express from "express";
import {
  handleUserSignUp,
  handleUserLogIn,
} from "../controllers/userAuthController.js";

const userAuthRouter = express.Router();

userAuthRouter
  .post("/signup", handleUserSignUp)
  .post("/login", handleUserLogIn);

export default userAuthRouter;
