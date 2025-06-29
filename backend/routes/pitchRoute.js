import express from "express";
import {
  handleCreatePitch,
  handlePitchFileUpload,
} from "../controllers/pitchController.js";
import checkForAuth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const pitchRouter = express.Router();

pitchRouter
  .post("/create-pitch", checkForAuth, handleCreatePitch)
  .post(
    "/upload-pitch-file",
    checkForAuth,
    upload.single("file"),
    handlePitchFileUpload
  );

export default pitchRouter;
