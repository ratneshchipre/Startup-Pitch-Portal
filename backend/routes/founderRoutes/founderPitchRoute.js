import express from "express";
import {
  handleCreatePitch,
  getAllPitchesForFounder,
} from "../../controllers/founderControllers/pitchController.js";
import checkForAuth from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/multerMiddleware.js";
import { authorizeRole } from "../../middlewares/roleMiddleware.js";

const founderPitchRouter = express.Router();

founderPitchRouter
  .post(
    "/create-pitch",
    checkForAuth,
    authorizeRole(["founder"]),
    upload.single("file"),
    handleCreatePitch
  )
  .get(
    "/my-pitches",
    checkForAuth,
    authorizeRole(["founder"]),
    getAllPitchesForFounder
  );

export default founderPitchRouter;
