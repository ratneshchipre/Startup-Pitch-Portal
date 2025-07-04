import express from "express";
import { getPitchDetails } from "../controllers/pitchDetailsController.js";
import checkForAuth from "../middlewares/authMiddleware.js";

const pitchDetailsRouter = express.Router();

pitchDetailsRouter.get("/:pitchId", checkForAuth, getPitchDetails);

export default pitchDetailsRouter;
