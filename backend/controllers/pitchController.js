import Pitch from "../models/pitchModel.js";
import uploadToCloudinary from "../services/cloudinaryService.js";

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

export { handleCreatePitch };
