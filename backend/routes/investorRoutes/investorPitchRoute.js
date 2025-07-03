import express from "express";
import { getAllPitchesForInvestor } from "../../controllers/investorControllers/pitchController.js";
import checkForAuth from "../../middlewares/authMiddleware.js";
import { authorizeRole } from "../../middlewares/roleMiddleware.js";

const investorPitchRouter = express.Router();

investorPitchRouter.get(
  "/browse-pitches",
  checkForAuth,
  authorizeRole(["investor"]),
  getAllPitchesForInvestor
);

export default investorPitchRouter;
