import express from "express";
import {
  getUserData,
  updateUserData,
} from "../controllers/userAccountController.js";
import checkForAuth from "../middlewares/authMiddleware.js";

const userAccountRouter = express.Router();

userAccountRouter
  .get("/:role/:userId/data", checkForAuth, getUserData)
  .patch("/:role/:userId/update-data", checkForAuth, updateUserData);

export default userAccountRouter;
