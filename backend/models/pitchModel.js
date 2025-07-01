import mongoose from "mongoose";

const pitchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
    file: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    goal: {
      type: Number,
      required: true,
      trim: true,
    },
    tags: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Pitch = mongoose.model("Pitch", pitchSchema);

export default Pitch;
