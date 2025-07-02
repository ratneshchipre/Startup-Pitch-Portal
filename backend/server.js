import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Config
import connectMongoDb from "./config/mongodbConnect.js";
import dotenv from "dotenv";
dotenv.config();

// Routes
import userAuthRouter from "./routes/userAuthRoute.js";
import userAccountRouter from "./routes/userAccountRoute.js";
import founderPitchRouter from "./routes/founderRoutes/founderPitchRoute.js";

const app = express();
const PORT = process.env.PORT || 4001;

connectMongoDb(process.env.MONGO_URI)
  .then(() => console.log("MongoDb connected!"))
  .catch((err) => console.log(err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Common Routes
app.use("/api/user", userAuthRouter);
app.use("/api/account", userAccountRouter);
// Founder routes
app.use("/api/pitch", founderPitchRouter);
// Investor routes
// app.use("/api/pitches", )

app.listen(PORT, () => {
  console.log(`Server running successfully on PORT ${PORT}`);
});
