import express from "express";
import { handleCreatePitch } from "../controllers/pitchController.js";
import checkForAuth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const pitchRouter = express.Router();

pitchRouter.post(
  "/create-pitch",
  checkForAuth,
  upload.single("file"),
  handleCreatePitch
);

export default pitchRouter;
