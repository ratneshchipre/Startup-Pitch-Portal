import express from "express";
import { getUserData } from "../controllers/userAccountController.js";
import checkForAuth from "../middlewares/authMiddleware.js";

const userAccountRouter = express.Router();

userAccountRouter.get("/:role/:userId/data", checkForAuth, getUserData);

export default userAccountRouter;
