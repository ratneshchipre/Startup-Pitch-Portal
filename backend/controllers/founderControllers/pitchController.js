import Pitch from "../../models/pitchModel.js";
import uploadToCloudinary from "../../services/cloudinaryService.js";

const handleCreatePitch = async (req, res) => {
  try {
    const { title, details, category, goal, tags } = req.body;

    if (!title || !details || !category || !goal || !tags) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded for pitch. Please upload a file to proceed",
      });
    }

    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      "nextmove/pitches",
      req.file.mimetype
    );

    const pitchData = {
      userId: req.user.id,
      title,
      details,
      file: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        type: req.file.mimetype,
      },
      category,
      goal,
      tags,
    };

    const newPitch = new Pitch(pitchData);
    await newPitch.save();

    if (!newPitch) {
      return res.status(400).json({
        success: false,
        message: "Failed to create a pitch. Please try again later",
      });
    }

    return res.status(201).json({
      success: true,
      message: "A new pitch has been created successfully",
      pitchData: {
        id: newPitch._id,
        userId: req.user.id,
        title: newPitch.title,
        details: newPitch.details,
        file: newPitch.file,
        category: newPitch.category,
        goal: newPitch.goal,
        tags: newPitch.tags,
      },
    });
  } catch (error) {
    console.error("Error occurred while creating a pitch:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create a pitch. Please try again later",
    });
  }
};

const getAllPitchesForFounder = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login to continue",
      });
    }

    const pitches = await Pitch.find({ userId });

    if (!pitches) {
      return res.status(404).json({
        success: false,
        message: "No pitches found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pitches fetched successfully",
      pitches,
    });
  } catch (error) {
    console.error("Error occurred while fetching all pitches:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all pitches. Please try again later",
    });
  }
};

export { handleCreatePitch, getAllPitchesForFounder };
